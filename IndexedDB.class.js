class IndexedDB {
    DB_NAME;
    DB_STORE_NAME;
    KEY;
    VERSION = 1;
    db = null;
    store;
    request;
    trans;

    constructor(DB_NAME, DB_STORE_NAME, KEY, VERSION) {
        this.DB_NAME = DB_NAME;
        this.DB_STORE_NAME = DB_STORE_NAME;
        this.KEY = KEY;
        this.VERSION = VERSION;
    }
    /**
     * méthode openContentDB
     * initialise indexedDB
     */

    openContentDB() {
        return new Promise((resolve, reject) => {
            if (this.db != null) {
                resolve();
            }
            if (indexedDB) {
                this.request = indexedDB.open(this.DB_NAME, this.VERSION);
                this.request.onupgradeneeded = e => {
                    this.db = e.target.result;
                    e.target.transaction.onerror = indexedDB.onerror;
                    if (this.db.objectStoreNames.contains(this.DB_STORE_NAME)) {
                        this.db.deleteObjectStore(this.DB_STORE_NAME);
                    }
                    this.store = this.db.createObjectStore(this.DB_STORE_NAME, { keyPath: this.KEY });
                };
                this.request.onsuccess = e => {
                    this.db = e.target.result;
                    resolve();
                };
                this.request.onerror = e => reject("open erreur: " + e.target.error);
                
            } else {
                reject("IndexedDB n'est pas pris en charge");
            }



        });
    }


    /**
     * méthode putContentDB
     * clé de stockage = Content
     * valeur de stockage = JSON.stringify(Content)
     * avec IndexedDB
     */
    putContentDB(key, val) {
        return new Promise((resolve, reject) => {
            this.openContentDB().then(() => {
                this.trans = this.db.transaction([this.DB_STORE_NAME], "readwrite");
                this.store = this.trans.objectStore(this.DB_STORE_NAME);
                this.request = this.store.put({
                    "key": key,
                    "val": val
                });
                this.request.onsuccess = e => resolve()
                this.request.onerror = (e) => reject("put erreur: " + e.target.error);
            })
        });
    }


    /**
     * méthode getContentDB
     * clé de lecture = Content
     * avec IndexedDB
     */
    getContentDB(key) {
        return new Promise((resolve, reject) => {
            this.openContentDB().then(() => {
                this.trans = this.db.transaction([this.DB_STORE_NAME], "readwrite");
                this.store = this.trans.objectStore(this.DB_STORE_NAME);
                this.request = this.store.get(key);
                this.request.onsuccess = e => {
                    if (this.request.result === undefined) {
                        resolve(false);
                    } else {
                        resolve(JSON.parse(this.request.result.val));
                    }
                };
                this.request.onerror = e => reject("getContentDB erreur: " + e.target.error);
                ;
            });
        });
    }


}

