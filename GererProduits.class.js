class GererProduits {
  indexedDB;
  keyWordInput = "";
  products;
  critariaTag;
  displayedProducts; //tableau destructibles de produits 
  tableHeader = []; // l’ordre des colonnes
  sortOrder;
  sortBy;
  /**
   *l'initiation  de cetraines propreités
   * recuperation des parametres de la base de donnees si existent 
   * @param products    le tableau des prouits 
   * @param indexedDB indexedDB
   */
  constructor(products, indexedDB) {
    if (!products instanceof Array) return;
    this.indexedDB = indexedDB;
    this.products = products;
    this.displayedProducts = this.products;
    this.tableTag = document.querySelector(".table");// tag HTML parent du tableau 
    this.critariaTag = document.querySelector(".critaires span") // tag HTML pour afficher les critere 
    this.getSavedParameters(this.indexedDB).then(c => {  // l'interogation de la base de donn
      this.tableHeader = c['tableHeader'] ? c['tableHeader'] : this.getNeededtableHeader(this.products); //obtention des nom de colonnes  
      this.sortOrder = c['sortOrder'] ? c['sortOrder'] : "ASC";
      this.sortBy = c['sortBy'] ? c['sortBy'] : ['id'];
      this.sortProducts(this.displayedProducts, this.sortOrder, this.sortBy) // cette fonction va appeler la fonction init()
      this.inputListenerManagement()// l'jout des listener sur les bouttons 
    }).catch(e => console.error(e))
  }
  /**
  *fait apple à d'autres fonctions 
  */
  init() {
    this.diaplayTable(this.tableHeader, this.displayedProducts);
    this.dragAndDropManagement(this.tableHeader)
    this.displayCriteria(this.sortOrder, this.sortBy)
    this.saveParameters(this.indexedDB)
  }

  /**
   *construit le header du tableau à afficher 
   * prend les cles de chaque object produit dans le tableau des prouits 
   * @param products    le tableau des prouits 
   * @returns tableHeader un tableau qui contient le header 
   */
  getNeededtableHeader(products) {
    let tableHeader = [];
    products.forEach(produit => {
      Object.keys(produit).forEach(element => {
        if (!tableHeader.includes(element)) tableHeader.push(element);// si nous n'avons pas encore la cle 
      });
    });
    return tableHeader;
  }
  /**
   * filter dans les texts du tableau produit 
   * cette fonction met à jour la propreité displayedProducts et apple init()
   * @param products    le tableau des prouits 
   * @param KeyWord    le mot cle recherché dans les text  
   * 
   */
  filterByKeyWord(products, KeyWord) {
    if (KeyWord.trim() === "") {
      this.displayedProducts = this.products; // si cle est vide on affiche tout le tableau 
    } else {
      this.displayedProducts = products.filter(o =>
        Object.keys(o).some(k =>
          typeof o[k] === "string" && // dans  les textes seulement
          o[k].toLowerCase().includes(KeyWord.toLowerCase())
        )
      );
    }
    this.init();
  }
  /**
  * tri le tableau des produit 
  * cette fonction met à jour la propreité displayedProducts et apple init()
  * @param products    le tableau des prouits 
  * @param sortOrder    descendant ou ascendant  
  * @param sortBy    tableau des citeres de tri
  * 
  */
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
  /**
  * l'affichage du tableau 
  * cette fonction met à jour la propreité tableTag.innerHTML 
  * @param products    le tableau des prouits 
  * @param tableHeader  tableau noms des colonnes  
  */
  diaplayTable(tableHeader, products) {
    let listeHTML = "<tr>";
    tableHeader.forEach(e => {
      // 'retouche du code'on remplace le mot id par Numéro et mettre en majuscule la premiere letrre 
      listeHTML += `<th id = "${e}">${e == 'id' ? 'Numéro' : e.charAt(0).toUpperCase() + e.slice(1)}</th>`;
    });
    listeHTML += "</tr>";
    products.forEach(product => {
      listeHTML += "<tr>";
      tableHeader.forEach(key => {
        listeHTML += "<td>" + product[key] + "</td>";
      });
      listeHTML += "</tr>";
    });
    this.tableTag.innerHTML = listeHTML;
  }
  /**
  * l'affichage des citeres d'affichage 
  * cette fonction met à jour la propreité critariaTag.innerHTML
  * @param sortOrder    descendant ou ascendant  
  * @param sortBy    tableau des citeres de tri  
  */
  displayCriteria(sortOrder, sortBy) {
    this.critariaTag.innerHTML = ""
    this.critariaTag.innerHTML = sortBy.map(x => x == 'id' ? x = 'Numéro' : x).toString()  // l'affichages des criteres 
    if (sortOrder == 'DESC') {
      document.querySelector('.ascendant').classList.remove('selected');
      document.querySelector('.descendant').classList.add('selected');
    } else {
      document.querySelector('.ascendant').classList.add('selected');
      document.querySelector('.descendant').classList.remove('selected');
    }
  }

  /**
    * cette fonction gere le drag et drop des nom de colonnes 
    * cette fonction fait apple à la fonction updateTableHeader à la fin du drop
    * @param tableHeader  tableau des noms des colonnes 
    */
  dragAndDropManagement(tableHeader) {
    let source, target, element;
    tableHeader.forEach(id => {   // l'id de la colonne est identique au nom de la colonne  
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
      element.addEventListener("drop", evt => { // drop fini on recupere les element qui ont bougés 
        evt.preventDefault();
        source = document.getElementById(evt.dataTransfer.getData("source"));
        target = evt.currentTarget;
        this.updateTableHeader(target.id, source.id); // l'apple à la fonction updateTableHeader
      });
    });
  }
  /**
  * cette fonction mets è jour le tableau des noms des colonnes apres le drag and drop 
  * cette fonction fait apple à la fonction init()
  * @param target  la nouvelle position du nom de la colonne dans le tableau
  * @param source  provenance du nom de la colonne 
  */
  updateTableHeader(target, source) {
    let indexSrc = this.tableHeader.indexOf(source);
    let indexTgt = this.tableHeader.indexOf(target);
    [this.tableHeader[indexTgt], this.tableHeader[indexSrc]] = [this.tableHeader[indexSrc], this.tableHeader[indexTgt]]; // l'echange des element dans le tableau 
    this.init();
  }

  /**
  * cette fonction gere les input 
  *  
  */
  inputListenerManagement() {
    window.addEventListener('click', (e) => {
      if (e.target.classList.contains('critere')) { //  bouttons critere de tri 
        this.sortBy = e.target.getAttribute('data-param').split(',')
        this.sortProducts(this.displayedProducts, this.sortOrder, this.sortBy)
      }
      if (e.target.classList.contains('order')) { // bouttons ascendant et descendant
        this.sortOrder = e.target.getAttribute('data-param')
        document.querySelectorAll('.order').forEach(element => {
        });
        this.sortProducts(this.displayedProducts, this.sortOrder, this.sortBy)
      }
    });
    document.querySelector(".key_word").addEventListener("keyup", e => {// champ de recherche par text 
      this.keyWordInput = e.target.value
      this.filterByKeyWord(this.products, e.target.value)
    });
  }

  /**
  * cette fonction sauvegarder les préférences de l’utilisateur 
  * @param indexedDB  
  */
  saveParameters(indexedDB) {
    let objetToSave = {};
    objetToSave['tableHeader'] = this.tableHeader
    objetToSave['sortOrder'] = this.sortOrder
    objetToSave['sortBy'] = this.sortBy
    indexedDB.putContentDB('test', JSON.stringify(objetToSave)) // l'apple à la methode indexedDB.putContentDB()
      .then(console.log('parametres enregistrés'))
      .catch(e => console.error(e))
  }
  /**
   * cette fonction recupere les préférences de l’utilisateur de l'indexedDB
   * @param indexedDB  
   * @returns Promise
   */
  getSavedParameters(indexedDB) {
    return new Promise((resolve, reject) => {
      indexedDB.getContentDB('test').then(c => resolve(c))
    })
  }
}
