class MakeTable {
  indexedDB;
  keyWordInput = "";
  products;
  displayedProducts;
  tableHeader = [];
  sortOrder;
  sortBy;
  saveParameters(indexedDB) {
    let objetToSave = {};
    objetToSave['tableHeader'] = this.tableHeader
    objetToSave['sortOrder'] = this.sortOrder
    objetToSave['sortBy'] = this.sortBy
    indexedDB.putContentDB('test', JSON.stringify(objetToSave)).then(() => console.log('parametres enregistrés'))
  }

  getSavedParameters(indexedDB) {
    return new Promise((resolve, reject) => {
      indexedDB.getContentDB('test').then(c =>resolve(c))
    })
  }
  constructor(products, indexedDB) {
    this.indexedDB = indexedDB;
    this.products = products;
    if (!products instanceof Array) return;
    this.getSavedParameters(this.indexedDB).then(c => {
      this.tableHeader = c['tableHeader'] || this.getNeededtableHeader(this.products)
      this.sortOrder = c['sortOrder'] || "ASC";
      this.sortBy = c['sortBy'] || ['id'];
      this.displayedProducts = this.products;
      this.tableTag = document.querySelector(".table");

      document.querySelector(".key_word").addEventListener("keyup", e => {
        this.filterByKeyWord(this.products, e.target.value)
      });
      document.querySelector(".by_cnum").addEventListener('click', e => {
        this.orderBy = ['categorie', 'id']
        this.sortProducts(this.displayedProducts, this.sortOrder, this.sortBy)
      });
      document.querySelector(".by_cnom").addEventListener('click', e => {
        this.orderBy = ['categorie', 'nom']
        this.sortProducts(this.displayedProducts, this.sortOrder, this.orderBy)
      });
      document.querySelector(".by_cprix").addEventListener('click', e => {
        this.orderBy = ['categorie', 'prix']
        this.sortProducts(this.displayedProducts, this.sortOrder, this.orderBy)
      });
      document.querySelector(".by_nom").addEventListener('click', e => {
        this.sortBy = ['nom'];
        this.sortProducts(this.displayedProducts, this.sortOrder, this.sortBy)
      })
      document.querySelector(".by_prix").addEventListener('click', e => {
        this.sortBy = ['prix']
        this.sortProducts(this.displayedProducts, this.sortOrder, this.sortBy)
      })
      document.querySelector(".by_num").addEventListener('click', e => {
        this.sortBy = ['id']
        this.sortProducts(this.displayedProducts, this.sortOrder, this.sortBy)
      })
      document.querySelector(".descendant").addEventListener('click', e => {
        this.sortOrder = "DESC";
        this.sortProducts(this.displayedProducts, this.sortOrder, this.sortBy)
      })
      document.querySelector(".ascendant").addEventListener('click', e => {
        this.sortOrder = "ASC";
        this.sortProducts(this.displayedProducts, this.sortOrder, this.sortBy)
      })
      //this.getNeededtableHeader(this.products);
      this.init();
    })
  }
  init() {
    this.diaplayTable(this.tableHeader, this.displayedProducts);
    this.dragAndDropManagement(this.tableHeader)
    this.saveParameters(this.indexedDB)

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
            o[k].toLowerCase().includes(KeyWord.toLowerCase())
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

  getNeededtableHeader(products) {
    let tableHeader = [];
    products.forEach(produit => {
      Object.keys(produit).forEach(element => {
        if (!tableHeader.includes(element)) tableHeader.push(element);
      });
    });
    return tableHeader;
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
      element.addEventListener("dragstart", function (evt) {
        evt.dataTransfer.setData("source", evt.target.id);
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
