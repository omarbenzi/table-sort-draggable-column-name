var produits = [
  {
    id: 0,
    nom: "Couche Huggies",
    description: "Couche de marque Huggies",
    prix: 30.55,
    categorie: "b\u00e9b\u00e9"
  },
  {
    id: 1,
    nom: "Couche Pampers",
    description: "Couche de marque Pampers",
    prix: 31.55,
    categorie: "b\u00e9b\u00e9"
  },
  {
    id: 2,
    nom: "Jus orange",
    description: "2 litres de jus",
    prix: 4.95,
    categorie: "\u00e9picerie"
  },
  {
    id: 3,
    nom: "Plats congel\u00e9s",
    description: "Divers plats congel\u00e9s",
    prix: 3.45,
    categorie: "\u00e9picerie"
  },
  {
    id: 4,
    nom: "Caf\u00e9 moulu",
    description: "Caf\u00e9 moulue pour espresso",
    prix: 10.99,
    categorie: "\u00e9picerie"
  },
  {
    id: 5,
    nom: "Embout de peinture",
    description: "Remplacement pour peinture en a\u00e9rosol",
    prix: 0.99,
    categorie: "quincaillerie"
  },
  {
    id: 6,
    nom: "Antivirus McAfee",
    description: "Logiciel antivirus pour PC",
    prix: 45.99,
    categorie: "informatique"
  },
  {
    id: 7,
    nom: "CD Insect Photo Gallery",
    description: "Logiciel de photo d'insecte",
    prix: 15.99,
    categorie: "informatique"
  },
  {
    id: 8,
    nom: "WD-40",
    description: "Produit lubrifiant",
    prix: 8.99,
    categorie: "quincaillerie"
  },
  {
    id: 9,
    nom: "Iphone mini gs6",
    description: "Produit qui passe de mode rapidement",
    prix: 699.99,
    categorie: "informatique"
  },
  {
    id: 10,
    nom: "Nettoyant pour v\u00e9lo",
    description: "Produit de nettoyage pour v\u00e9lo",
    prix: 15.99,
    categorie: "quincaillerie"
  },
  {
    id: 11,
    nom: "Cr\u00e8me \u00e0 polir",
    description: "Produit pour polir les carrosseries de voiture ",
    prix: 15.99,
    categorie: "informatique"
  },
  {
    id: 12,
    nom: "Porte-document",
    description: "Porte-document en bois",
    prix: 299.99,
    categorie: "informatique"
  },
  {
    id: 13,
    nom: "Porte-document",
    description: "Porte-document \u00e0 l'\u00e9preuve de l'eau!",
    prix: 0.99,
    categorie: "informatique"
  },
  {
    id: 14,
    nom: "Porte-document",
    description:
      "Un tr\u00e8s gros porte document \u00e0 l'\u00e9preuve des balles",
    prix: 0.99,
    categorie: "informatique"
  },
  {
    id: 15,
    nom: "Bicarbonate de soude",
    description: "Produit de cuisine et de nettoyage",
    prix: 0.99,
    categorie: "\u00e9picerie"
  },
  {
    id: 16,
    nom: "Cl\u00e9 usb",
    description: "M\u00e9moire USB de Voyager GT",
    prix: 64.99,
    categorie: "informatique"
  },
  {
    id: 17,
    nom: "Cl\u00e9 usb",
    description: "M\u00e9moire USB de Voyager GTR",
    prix: 94.99,
    categorie: "informatique"
  },
  {
    id: 18,
    nom: "Corsair F115",
    description: "Disque dure SSD 115 Go",
    prix: 150.99,
    categorie: "informatique"
  },
  {
    id: 19,
    nom: "Produit anti-tache",
    description: "Anti-tache pour tissus ou tapis",
    prix: 14.99,
    categorie: "informatique"
  },
  {
    id: 20,
    nom: "Tomate",
    description: "Caisse de tomate Ovation",
    prix: 3.99,
    categorie: "\u00e9picerie"
  },
  {
    id: 21,
    nom: "Cr\u00e8me de beaut\u00e9 pour homme",
    description: "Permet de garder les mains douces tout en programmant",
    prix: 24.99,
    categorie: "beaut\u00e9"
  },
  {
    id: 22,
    nom: "Porte-document",
    description: "Porte-document en cuir",
    prix: 99.99,
    categorie: "informatique"
  },
  {
    id: 23,
    nom: "Banane",
    description: "Banane jaune",
    prix: 0.99,
    categorie: "\u00e9picerie"
  },
  {
    id: 24,
    nom: "Porte-document",
    description: "Porte-document en carton",
    prix: 3.99,
    categorie: "informatique"
  },
  {
    id: 25,
    nom: "Table de massage",
    description: "Table de massage vibrante et chauffante",
    prix: 2300,
    categorie: "divers"
  },
  {
    id: 26,
    nom: "T\u00e9l\u00e9phone \u00e9pais",
    description: "T\u00e9l\u00e9phone mobile qui permet seulement d'appeler",
    prix: 80.99,
    categorie: "informatique"
  },
  {
    id: 27,
    nom: "Nettoyant",
    description: "Nettoyant",
    prix: 4.99,
    categorie: "quincaillerie"
  },
  {
    id: 28,
    nom: "GPS",
    description: "GPS de marque LG",
    prix: 79.99,
    categorie: "informatique"
  },
  {
    id: 29,
    nom: "M\u00e9langeur \u00e9lectrique",
    description: "M\u00e9langeur \u00e9lectrique de 5 litres",
    prix: 399.99,
    categorie: "quincaillerie"
  },
  {
    id: 30,
    nom: "Boule 8",
    description: "Boule de billard num\u00e9ro 8",
    prix: 0.99,
    categorie: "divers"
  },
  {
    id: 31,
    nom: "Slackline",
    description: "Slackline de 2 pouces",
    prix: 46.99,
    categorie: "divers"
  },
  {
    id: 32,
    nom: "Thermom\u00e8tre \u00e0 jardin",
    description: "Pour obtenir la temp\u00e9rature du jardin",
    prix: 29.99,
    categorie: "quincaillerie"
  },
  {
    id: 33,
    nom: "Huile de bronzage pour deck",
    description: "Pour que votre deck n'attrape pas de coup de soleil",
    prix: 15.99,
    categorie: "quincaillerie"
  },
  {
    id: 34,
    nom: "Huile prodigieuse",
    description: "\u00c7a dit tout!",
    prix: 99.99,
    categorie: "beaut\u00e9"
  },
  {
    id: 35,
    nom: "Protecteur pour t\u00e9l\u00e9phone",
    description: "Divers mod\u00e8le en stock",
    prix: 39.99,
    categorie: "informatique"
  },
  {
    id: 36,
    nom: "Ajax",
    description: "Il fallait bien qu'il y en ait!",
    prix: 0.99,
    categorie: "informatique"
  },
  {
    id: 37,
    nom: "Montre",
    description: "Montre \u00e0 cadran",
    prix: 399.99,
    categorie: "divers"
  },
  {
    id: 38,
    nom: "Soufleuse",
    description: "Soufleuse de 48 pouces",
    prix: 899.99,
    categorie: "quincaillerie"
  },
  {
    id: 39,
    nom: "N\u00e9cessaire de transfusion sanguine",
    description: "Excellent pour cycliste ou pour athl\u00e8te de haut niveau",
    prix: 89.99,
    categorie: "divers"
  },
  {
    id: 40,
    nom: "Tablier Masterchef",
    description: "Tablier Masterchef",
    prix: 14.99,
    categorie: "divers"
  }
];

