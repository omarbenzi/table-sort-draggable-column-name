class MakeTable {
  products;
  tableHeader = [];
  searchKeyWord;

  constructor(products) {
    if (!products instanceof Array) return;
    this.products = products;
    this.init();
  }

  init() {
    this.getNeededtableHeaderr(this.products);
    //this.filterByKeyWord(this.products, "h");
    this.diaplayTable(
      this.tableHeader,
      this.filterByKeyWord(this.products, "om")
    );
    this.tableHeader.forEach(e => {
      this.dragAndDropManagement(document.getElementById(e));
    });
  }

  filterByKeyWord(products, KeyWord) {
    KeyWord = KeyWord.toString();
    return products.filter(o =>
      Object.keys(o).some(
        k =>
          (typeof o[k] === "string" &&
            o[k].toLowerCase().includes(KeyWord.toLowerCase())) ||
          KeyWord === ""
      )
    );
  }

  getNeededtableHeaderr(products) {
    products.forEach(produit => {
      Object.keys(produit).forEach(element => {
        if (!this.tableHeader.includes(element)) this.tableHeader.push(element);
      });
    });
  }

  diaplayTable(tableHeader, products) {
    let listeHTML = "<tr>";
    tableHeader.forEach(e => {
      listeHTML += `<th id = "${e}">${e}</th>`;
    });
    listeHTML += "</tr>";
    for (let i = 0; i < products.length; i++) {
      let p = products[i];
      listeHTML += "<tr>";
      tableHeader.forEach(e => {
        listeHTML += "<td>" + p[e] + "</td>";
      });
      listeHTML += "</tr>";
    }
    document.querySelector(".table").innerHTML = listeHTML;
  }

  dragAndDropManagement(element) {
    let src, tgt;
    element.setAttribute("draggable", true);
    element.addEventListener("dragstart", function(evt) {
      evt.dataTransfer.setData("src", evt.target.id);
      evt.target.style.backgroundColor = "gray";
    });
    element.addEventListener("drag", function(evt) {
      evt.target.style.opacity = 0;
    });
    element.addEventListener("dragend", function(evt) {
      evt.target.style.opacity = 1;
      evt.target.style.backgroundColor = "";
    });
    element.addEventListener("dragover", function(evt) {
      evt.preventDefault();
    });
    element.addEventListener("drop", evt => {
      evt.preventDefault();
      src = document.getElementById(evt.dataTransfer.getData("src"));
      tgt = evt.currentTarget;
      this.updateTableHeader(tgt.id, src.id);
    });
  }

  updateTableHeader(tgt, src) {
    let indexSrc = this.tableHeader.indexOf(src);
    let indexTgt = this.tableHeader.indexOf(tgt);
    [this.tableHeader[indexTgt], this.tableHeader[indexSrc]] = [
      this.tableHeader[indexSrc],
      this.tableHeader[indexTgt]
    ];
    this.init();
  }
}
