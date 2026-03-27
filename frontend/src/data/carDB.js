export const carDB = {

  Hyundai: [
    "Creta","Venue","i20","Verna","Alcazar","Tucson","Aura","Exter","Santro","Grand i10","Kona",
    "i10","Elantra","Terracan","Accent","Getz","Santro Xing","Eon","Xcent","Santa Fe","Tiburon"
  ],

  Maruti: [
    "Swift","Baleno","Dzire","Brezza","Ertiga","XL6","Fronx","Alto","WagonR","Celerio","Ignis",
    "S-Presso","Vitara Brezza","Ciaz","Eeco","Omni","Gypsy"
  ],

  Tata: [
    "Nexon","Punch","Harrier","Safari","Altroz","Tiago","Tigor","Hexa","Indica","Indigo","Sierra","Zest","Bolt",
    "Nano", "Sail","Vista","Aria", "Zica", "Zest","Hexa","Buzzard","GenX Nano", "H2X", "HBX", "Altroz EV", "Tigor EV",
    "Nexon EV", "Xpres-T EV", "Curvv", "Avinya", "Starbus", "Winger", "Ace", "Intra", "Magic", "Super Ace", "Prima", "Signa"

  ],

  Mahindra: [
    "Thar","Scorpio","Scorpio N","XUV300","XUV700","Bolero","Bolero Neo","Marazzo","KUV100","Verito","Alturas G4","TUV300","Quanto","Xylo","eKUV100",
    "eVerito","eSupro","Jeep Thar","Jeep Compass","Jeep Wrangler",
  ],

  Kia: [
    "Seltos","Sonet","Carens","EV6","Carnival","Stonic","K3","K5","K8","K9"
  ],

  Toyota: [
    "Fortuner","Innova","Hycross","Glanza","Urban Cruiser","Camry","Vellfire","Yaris","Corolla","Glanza","Etios","Prius","Land Cruiser",
    "Land Cruiser Prado","Hilux","Vios","Qualis","FJ Cruiser","Supra", "Etios Cross","Innova Crysta","Innova Touring Sport","Innova EV","Sienna","RAV4","Highlander","Venza",
    "Mirai","bZ4X","bZ3"
  ],

  Honda: [
    "City","Amaze","Elevate","WRV","Jazz","Amaze","CR-V","HR-V","Civic","Accord","BR-V","BR-V EV","CR-Z","Civic Type R","Clarity","Insight",
    "Legend","S2000","Vezel","Zest","Mobilio","Amaze EV"
  ],

  Volkswagen: [
    "Polo","Virtus","Taigun","Vento","Passat","Tayron","Tiguan","Touareg","Vento","Jetta","ID.4","ID.3","Arteon",
    "Golf","Beetle","Scirocco","Amarok","Atlas","CrossPolo","e-Golf","e-up!",
  ],

  Skoda: [
    "Rapid","Slavia","Kushaq","Superb","Octavia"
  ],

  MG: [
    "Hector","Astor","ZS EV","Comet"
  ],

  Nissan: [
    "Magnite","Kicks"
  ],

  Renault: [
    "Kwid","Kiger","Triber","Duster"
  ],

  Ford: [
    "EcoSport","Endeavour","Figo","Aspire"
  ],

  /* ================= LUXURY ================= */

  BMW: [
    "1 Series","2 Series","3 Series","5 Series","7 Series",
    "X1","X3","X5","X7","Z4","i4","i7"
  ],

  Audi: [
    "A3","A4","A6","A8",
    "Q2","Q3","Q5","Q7","Q8",
    "e-tron","RS5","RS7"
  ],

  Mercedes: [
    "A Class","C Class","E Class","S Class",
    "GLA","GLC","GLE","GLS",
    "AMG GT","Maybach S-Class"
  ],

  Jaguar: [
    "XE","XF","F-Type","F-Pace","I-Pace"
  ],

  "Land Rover": [
    "Defender","Discovery","Discovery Sport","Range Rover","Range Rover Sport","Range Rover Velar","Evoque"
  ],

  Porsche: [
    "Macan","Cayenne","Panamera","911","Taycan"
  ],

  Lexus: [
    "ES","NX","RX","LX","LS"
  ],

  Volvo: [
    "XC40","XC60","XC90","S60","S90"
  ],

  Tesla: [
    "Model 3","Model Y","Model S","Model X"
  ]
};
export function expandCars(db) {
  const expanded = {};

  Object.keys(db).forEach(brand => {
    expanded[brand] = [];

    db[brand].forEach(model => {
      expanded[brand].push(model);
      expanded[brand].push(model + " Sport");
      expanded[brand].push(model + " Plus");
      expanded[brand].push(model + " Pro");
    });
  });

  return expanded;
}