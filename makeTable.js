class MakeTable {
  keyWordInput = "";
  products;
  displayedProducts;
  tableHeader = [];
  sortOrder = "ASC";

  constructor(products) {
    if (!products instanceof Array) return;
    this.products = products;
    this.displayedProducts = this.products;
    this.tableTag = document.querySelector(".table");

    // document.querySelector(".key_word").addEventListener("keyup", e =>
    //   this.filterByKeyWord(this.products, e.target.value))
    // document.querySelector(".sort_categorie_nom").addEventListener('click', e =>
    //   this.sortProducts(this.displayedProducts, this.sortOrder, ['categorie', 'id']))

    this.getNeededtableHeaderr(this.products);
    this.init();
    Object.keys(window).forEach(key => {
      console.log(key);

      if (/^onclick/.test(key)) {
        window.addEventListener(key.slice(2), event => {
          console.log(event.target.id);
          console.log(event.type);
        });
      }
    });
  }
  init() {
    this.diaplayTable(this.tableHeader, this.displayedProducts);
    this.dragAndDropManagement(this.tableHeader);
  }

  filterByKeyWord(products, KeyWord) {
    if (KeyWord.trim() === "") {
      this.displayedProducts = this.products;
    } else {
      this.displayedProducts = products.filter(o =>
        Object.keys(o).some(
          k =>
            typeof KeyWord === "string" &&
            typeof o[k] === "string" &&
            o[k].toLowerCase().includes(KeyWord.toLowerCase()) // ||
          //KeyWord === o[k]
        )
      );
    }
    this.init();
  }
  sortProducts(products, sortOrder, sortBy) {
    this.displayedProducts = products.sort((g, d) => {
      let ret = sortOrder == "ASC" ? 1 : -1;
      for (let critaria in sortBy) {
        let c = sortBy[critaria];
        if (typeof g[c] == "number") {
          if (g[c] > d[c]) return ret;
          if (g[c] < d[c]) return -ret;
        } else {
          if (g[c].localeCompare(d[c]) > 0) return ret;
          if (g[c].localeCompare(d[c]) < 0) return -ret;
        }
      }
    });
    this.init();
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
    products.forEach(critaria => {
      listeHTML += "<tr>";
      tableHeader.forEach(e => {
        listeHTML += "<td>" + critaria[e] + "</td>";
      });
      listeHTML += "</tr>";
    });
    this.tableTag.innerHTML = listeHTML;
  }

  dragAndDropManagement(tableHeader) {
    let source, target, element;
    tableHeader.forEach(id => {
      element = document.getElementById(id);
      element.setAttribute("draggable", true);
      element.addEventListener("dragstart", function(evt) {
        evt.dataTransfer.setData("source", evt.target.id);
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
        source = document.getElementById(evt.dataTransfer.getData("source"));
        target = evt.currentTarget;
        this.updateTableHeader(target.id, source.id);
      });
    });
  }

  updateTableHeader(target, source) {
    let indexSrc = this.tableHeader.indexOf(source);
    let indexTgt = this.tableHeader.indexOf(target);
    [this.tableHeader[indexTgt], this.tableHeader[indexSrc]] = [
      this.tableHeader[indexSrc],
      this.tableHeader[indexTgt]
    ];
    this.init();
  }
}
