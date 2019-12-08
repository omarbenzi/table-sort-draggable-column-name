class MakeTable {
  produits;
  tableHeader = [];

  constructor(produits) {
    if (!produits instanceof Array) return
    this.produits = produits;
    this.init()
  }

  init() {
    this.getNeededtableHeaderr();
    this.diaplayTable();
    this.tableHeader.forEach(e => {
      this.appliquerLeGlisser(document.getElementById(e))
    })
  }
  getNeededtableHeaderr() {
    this.produits.forEach((produit) => {
      Object.keys(produit).forEach(element => {
        if (!this.tableHeader.includes(element)) this.tableHeader.push(element);
      });
    });
  }

  /**
 *  mise en forme HTML du tableau des produits
 *  et insertion dans la section d'id liste
 */
  diaplayTable() {
    let listeHTML = "<tr>";
    this.tableHeader.forEach(e => {
      listeHTML += `<th id = "${ e }">${ e }</th>`
    })
    listeHTML += "</tr>";

    for (let i = 0; i < this.produits.length; i++) {
      let p = this.produits[i];
      listeHTML += "<tr>";
      this.tableHeader.forEach(e => {
        listeHTML += "<td>" + p[e] + "</td>"
      })
      listeHTML += "</tr>";
    }
    document.querySelector(".table").innerHTML = listeHTML;
  }
  appliquerLeGlisser(element) {
    let src, srcParent, tgt;
    element.setAttribute("draggable", true);
    element.addEventListener("dragstart", function (evt) {
      evt.dataTransfer.setData("src", evt.target.id);
      evt.target.style.backgroundColor = "gray";
    });
    element.addEventListener("drag", function (evt) {
      evt.target.style.opacity = 0;
    });
    element.addEventListener("dragend", function (evt) {
      evt.target.style.opacity = 1;
      evt.target.style.backgroundColor = "";
    });
    element.addEventListener("dragover", function (evt) {
      evt.preventDefault();
    });
    element.addEventListener("drop", (evt) => {
      evt.preventDefault();
      src = document.getElementById(evt.dataTransfer.getData("src"));
      srcParent = src.parentNode;
      tgt = evt.currentTarget;
      this.updateTableHeader(tgt.id, src.id)
    });
  }

  updateTableHeader(tgt, drc) {
    let indexSrc = this.tableHeader.indexOf(drc);
    let indexTgt = this.tableHeader.indexOf(tgt);
    [this.tableHeader[indexTgt], this.tableHeader[indexSrc]] = [this.tableHeader[indexSrc], this.tableHeader[indexTgt]];
    this.init()
  }










































}