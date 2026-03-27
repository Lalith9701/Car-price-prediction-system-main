import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { carDB } from "./data/carDB";
import { cities } from "./data/cities";
import { expandCars } from "./data/carDB";
import "./App.css";

/* ================= STATIC ================= */

const CURRENT_YEAR = 2026;
const years = Array.from({ length: 20 }, (_, i) => CURRENT_YEAR - i);

const fuels = ["Petrol", "Diesel", "CNG", "Electric", "Hybrid"];
const owners = ["1st Owner", "2nd Owner", "3rd Owner"];
const transmissions = ["Manual", "Automatic", "AMT", "CVT"];
const serviceOptions = ["Full Service History", "Partial", "No Records"];
const accidentOptions = ["Yes", "No"];
const rcOptions = ["Available", "Not Available"];
const insuranceTypes = ["Third Party", "Comprehensive"];
const loanStatus = ["Clear", "Active", "No Finance"];
const exteriorOptions = ["Excellent", "Minor Scratches", "Dents", "Major Damage"];
const interiorOptions = ["Like New", "Good", "Needs Cleaning", "Damaged"];
const tyreOptions = ["New", "Good for 10k km", "Needs Replacement"];

/* ================= BASE PRICE ================= */

const basePrices = {
  Hyundai: { Creta: 1350000, i20: 900000 },

  Tata: { Nexon: 1100000 },

  Audi: {
    Q5: 6000000,
    Q7: 9000000,
    A4: 4500000
  },

  BMW: {
    "3 Series": 5000000,
    X5: 8500000,
    "5 Series": 7500000,
    "2 Series Gran Couple": 4000000
 
  },

  Mercedes: {
    "C Class": 5500000,
    GLC: 7000000
  }
};
const luxuryBrands = [
  "Audi","BMW","Mercedes","Jaguar","Land Rover","Porsche","Lexus","Volvo",
  "Maserati","Ferrari","Lamborghini","Bentley","Rolls-Royce",
  "Aston Martin","Bugatti","McLaren","Koenigsegg","Pagani","Rimac",
  "Lotus","Alfa Romeo","Infiniti","Acura","Cadillac","Lincoln",
  "Genesis","DS Automobiles","Polestar","Rivian","Lucid Motors"
];

/* ================= PRICE LOGIC ================= */

function calculateCarPrice(car) {

  let base = basePrices[car.brand]?.[car.model];

 if (!base) {
  // estimate by segment
  if (luxuryBrands.includes(car.brand)) base = 6000000;
  else base = 1000000;
 }

  const age = CURRENT_YEAR - Number(car.year);

  let value = base;

 for (let i = 0; i < age; i++) {
  if (i === 0) value *= 0.85;
  else if (i <= 3) value *= 0.90;
  else value *= 0.95;
 }
  const km = car.km === "" ? null : Number(car.km);
  const idealKm = age * 12000;

  if (km !== null) {
  if (km < idealKm) value *= 1.05;
  else if (km > idealKm * 1.5) value *= 0.90;
}
  if (car.fuel === "Diesel") value *= 1.04;
  if (car.fuel === "Electric") value *= 1.08;
  if (car.fuel === "CNG") value *= 0.96;

  if (car.transmission === "Automatic") value *= 1.05;
  if (car.owner === "2nd Owner") value *= 0.94;
  if (car.owner === "3rd Owner") value *= 0.85;

  if (car.service === "Full Service History") value *= 1.06;
  if (car.service === "No Records") value *= 0.88;

  if (car.accident === "Yes") value *= 0.75;


  if (luxuryBrands.includes(car.brand)) {
  value *= 0.97; // slightly faster depreciation
}

  const demandBoost = {
    Hyundai: 1.02,
    Maruti: 1.03,
    Tata: 1.04,
    Mahindra: 1.03,
    Kia: 1.03,
    Toyota: 1.05,
    Honda: 1.04,
    Volkswagen: 1.02,
    Skoda: 1.02,
    MG: 1.03,
    Nissan: 1.02,
    Renault: 1.02,
    Ford: 1.03,
    Audi: 1.04,
    BMW: 1.05,
    Mercedes: 1.05,
    Jaguar: 1.04,
    "Land Rover": 1.04,
    Porsche: 1.05,
    Lexus: 1.04,
    Volvo: 1.03,
    Maserati: 1.04,
    Ferrari: 1.06,
    Lamborghini: 1.06,
    Bentley: 1.05,
    "Rolls-Royce": 1.05,
    "Aston Martin": 1.04,
    Bugatti: 1.07,
    McLaren: 1.06,
    Koenigsegg: 1.07,
    Pagani: 1.06,
    Rimac: 1.05,
    Lotus: 1.03,
    "Alfa Romeo": 1.02,
    Infiniti: 1.02,
    Acura: 1.02,
    Cadillac: 1.02,
    Lincoln: 1.02,
    Genesis: 1.03,
    "DS Automobiles": 1.02,
    Polestar: 1.03,
    Rivian: 1.04,
    "Lucid Motors": 1.04

  };

  value *= demandBoost[car.brand] || 1;

  const cityBoost = {
    Mumbai: 1.05,
    Bangalore: 1.04,
    Hyderabad: 1.03,
    Pune: 1.03,
    Delhi: 1.02,
    Chennai: 1.02,
    Kolkata: 1.01,
    Ahmedabad: 1.01,
    "Navi Mumbai": 1.04,
    Thane: 1.03,
    Bhopal: 1.02,
    "Visakhapatnam": 1.02,
    "Pimpri-Chinchwad": 1.03,
    Ludhiana: 1.01,
    Agra: 1.01,
    Nashik: 1.02,
    Faridabad: 1.01,
    Meerut: 1.01,
    Rajkot: 1.01,
    "Kalyan-Dombivli": 1.03,
    "Vasai-Virar": 1.02,
    Varanasi: 1.01,
    Srinagar: 0.98,
    Aurangabad: 1.01,
    Dhanbad: 0.97,
    Amritsar: 1.01,
    Nanded: 0.98,
    Allahabad: 1.00,
    Howrah: 0.99,
    Gwalior: 0.99,
    Jabalpur: 0.99,
    Coimbatore: 1.01,
    Vijayawada: 1.00,
    Jodhpur: 0.98,
    Madurai: 1.00,
    Raipur: 0.99,
    Kota: 0.98,
    Guwahati: 0.97,
    Chandigarh: 1.00,
    Solapur: 0.97,
    "Hubli-Dharwad": 0.98,
    Mysore: 1.00,
    Tiruchirappalli: 0.99,
    Bareilly: 0.98,
    Aligarh: 0.98,
    Moradabad: 0.97,
    Jalandhar: 0.99,
    Bhubaneswar: 0.98,
    Salem: 0.98,
    Warangal: 0.97,
    Guntur: 0.98,
    Bhiwandi: 1.02,
    Saharanpur: 0.97,
    Gorakhpur: 0.97,
    Amravati: 0.98,
    Bikaner: 0.97,
    Noida: 1.03,
    Jamshedpur: 0.97,
    Bhilai: 0.98,
    Cuttack: 0.97,
    Firozabad: 0.96,
    Kochi: 1.01,
    Nellore: 0.97,
    Bhavnagar: 0.97,
    Dehradun: 1.00,
    Durgapur: 0.96,
    Pulivendula: 0.95,
    Asansol: 0.96,
    Rourkela: 0.96,
    Nizamabad: 0.97,
    Kolhapur: 0.98,
    Ajmer: 0.97,
    Gulbarga: 0.96,
    Jamnagar: 0.97,
    Ujjain: 0.97,
    Tirupati: 0.98,
    Hapur: 0.97,
    Sikar: 0.96,
    Panchkula: 0.98,
    Satara: 0.97,
  };

  value *= cityBoost[car.city] || 1;

  const mid = Math.round(value);

  const fair = Math.round(mid * 0.92);
  const good = Math.round(mid * 1.00);
  const excellent = Math.round(mid * 1.08);

  const dealer = Math.round(fair * 0.93);

  return { fair, good, excellent, dealer };
}

/* ================= COMPONENT ================= */

export default function SellCar() {

  const [car, setCar] = useState({
    brand: "",
    model: "",
    year: "",
    fuel: "",
    km: "",
    owner: "",
    transmission: "",
    service: "",
    accident: "",
    city: "",
    rc: "",
    insurance: "",
    loan: "",
    exterior: "",
    interior: "",
    tyre: ""
  });

  const [sellerName, setSellerName] = useState("");
  const [sellerPhone, setSellerPhone] = useState("");

  const [models, setModels] = useState([]);
  const [images, setImages] = useState([]);

  const [fairPrice, setFairPrice] = useState(0);
  const [goodPrice, setGoodPrice] = useState(0);
  const [excellentPrice, setExcellentPrice] = useState(0);
  const [dealerPrice, setDealerPrice] = useState(0);
  const [sellType, setSellType] = useState("Individual");
  const [listingDuration, setListingDuration] = useState(10);
  
  const navigate = useNavigate();
  

  const setValue = (key, value) => {
  setCar(prev => {
    const updated = { ...prev, [key]: value };

    // 🔥 RESET PRICE if any important field cleared
    if (
      !updated.brand ||
      !updated.model ||
      !updated.year ||
      !updated.fuel ||
      updated.km === ""
    ) {
      setFairPrice(0);
      setGoodPrice(0);
      setExcellentPrice(0);
      setDealerPrice(0);
    }

    return updated;
  });
};
  const selectBrand = (b) => {
    setValue("brand", b);
    setValue("model", ""); 
    setModels(carDB[b] || []);
  };

  useEffect(() => {
    const localUser = localStorage.getItem("user");
    if (localUser) {
      try {
        const u = JSON.parse(localUser);
        setSellerName(u.name || "");
        setSellerPhone(u.phone || "");
      } catch (e) {}
    }
  }, []);

  /* ✅ FIXED useEffect */
  useEffect(() => {
  if (
    !car.brand ||
    !car.model ||
    !car.year ||
    !car.fuel ||
    car.km === "" ||
    !sellType   // ✅ IMPORTANT
  ) {
    setFairPrice(0);
    setGoodPrice(0);
    setExcellentPrice(0);
    setDealerPrice(0);
    return;
  }

  const fetchPrediction = async () => {
    try {
      let ownerInt = 1;
      if (car.owner === "2nd Owner") ownerInt = 2;
      else if (car.owner === "3rd Owner") ownerInt = 3;

      const res = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          brand: car.brand,
          model: car.model,
          year: parseInt(car.year) || 2015,
          km_driven: parseInt(car.km) || 50000,
          fuel: car.fuel,
          transmission: car.transmission,
          owner: ownerInt
        })
      });
      const data = await res.json();
      let mid = data.predicted_price;
      if (!mid) return;

      let fair = Math.round(mid * 0.92);
      let good = Math.round(mid * 1.00);
      let excellent = Math.round(mid * 1.08);
      let dealer = Math.round(fair * 0.93);

      if (sellType === "Individual") {
        fair *= 1.08;
        good *= 1.10;
        excellent *= 1.12;
        dealer *= 1.05;
      }

      setFairPrice(Math.round(fair));
      setGoodPrice(Math.round(good));
      setExcellentPrice(Math.round(excellent));
      setDealerPrice(Math.round(dealer));
    } catch(err) {
      console.error("Prediction error:", err);
    }
  };

  fetchPrediction();

}, [car, sellType]);
  

  const safeCar = {
  ...car,
  km: car.km || null,
  fuel: car.fuel || "Petrol",
  owner: car.owner || "1st Owner",
  transmission: car.transmission || "Manual",
  service: car.service || "Partial",
  accident: car.accident || "No"
};

  /* ================= DOT POSITION ================= */

  const min = fairPrice;
  const max = excellentPrice;

  const getPosition = (price) => {
    if (!min || !max || max === min) return 0;
    return ((price - min) / (max - min)) * 100;
  };

  const fairPos = getPosition(fairPrice);
  const goodPos = getPosition(goodPrice);

  const handlePublish = async () => {
    if (!car.brand || !car.model || images.length === 0) {
      alert("Fill details + upload images");
      return;
    }

    const formData = new FormData();
    formData.append("name", `${car.brand} ${car.model}`);
    formData.append("year", car.year);
    formData.append("km", car.km);
    formData.append("fuel", car.fuel);
    formData.append("transmission", car.transmission);
    formData.append("owners", car.owner);
    formData.append("city", car.city);
    formData.append("service", car.service);
    formData.append("accident", car.accident);
    formData.append("rc", car.rc);
    formData.append("insurance", car.insurance);
    formData.append("loan", car.loan);
    formData.append("exterior", car.exterior);
    formData.append("interior", car.interior);
    formData.append("tyre", car.tyre);
    formData.append("sellerName", sellerName);
    formData.append("sellerPhone", sellerPhone);
    formData.append("price", fairPrice);
    formData.append("listingDuration", listingDuration);

    for (let i = 0; i < images.length; i++) {
       formData.append("images", images[i]);
    }

    try {
      const res = await fetch("http://localhost:5050/cars", {
        method: "POST",
        body: formData
      });
      const data = await res.json();
      if(data.success){
        alert("🚀 Car posted to Used Cars!");
        navigate("/listing");
      } else {
        alert("Failed to post car.");
      }
    } catch(e) {
      console.error(e);
      alert("Error posting car.");
    }
  };

  return (
    <div className="sell-page">
      <div className="premium-card">

        <h1>Sell Your Car</h1>

 <select
  value={car.brand}
  onChange={(e) => selectBrand(e.target.value)}
>
  <option value="">Select Brand</option>

  {Object.keys(carDB).map((b) => (
    <option key={b} value={b}>
      {b}
    </option>
  ))}
</select>
        
<select
  value={car.model}
  onChange={(e) => setValue("model", e.target.value)}
>
  <option value="">Select Model</option>

  {models.map((m) => (
    <option key={m} value={m}>
      {m}
    </option>
  ))}
</select>

        <select onChange={e => setValue("year", e.target.value)}>
          <option>Manufacturing Year</option>
          {years.map(y => <option key={y}>{y}</option>)}
        </select>

        <input
         type="text"
         placeholder="KM Driven"
         value={car.km}
         onChange={(e) => {
           const value = e.target.value;

    // allow empty
         if (value === "" || /^[0-9]+$/.test(value)) {
         setValue("km", value);
        }
    }}
  />
        <select onChange={e => setValue("fuel", e.target.value)}>
          <option>Fuel Type</option>
          {fuels.map(f => <option key={f}>{f}</option>)}
        </select> 

        <select onChange={e => setValue("transmission", e.target.value)}>
          <option>Transmission</option>
          {transmissions.map(t => <option key={t}>{t}</option>)}
        </select>

        <select onChange={e => setValue("owner", e.target.value)}>
          <option>No. of Owners</option>
          {owners.map(o => <option key={o}>{o}</option>)}
        </select>

        <select onChange={e => setValue("service", e.target.value)}>
          <option>Service History</option>
          {serviceOptions.map(s => <option key={s}>{s}</option>)}
        </select>

        <select onChange={e => setValue("accident", e.target.value)}>
          <option>Select Accident</option>
          {accidentOptions.map(a => <option key={a}>{a}</option>)}
        </select>
<input
  list="cities"
  placeholder="Select City"
  value={car.city}
  onChange={(e) => setValue("city", e.target.value)}
/>

<datalist id="cities">
  {cities.map((c) => (
    <option key={c} value={c} />
  ))}
</datalist>

        <select onChange={e => setValue("rc", e.target.value)}>
          <option>Select RC</option>
          {rcOptions.map(r => <option key={r}>{r}</option>)}
        </select>

        <select onChange={e => setValue("insurance", e.target.value)}>
          <option>Select Insurance</option>
          {insuranceTypes.map(i => <option key={i}>{i}</option>)}
        </select>

        <select onChange={e => setValue("loan", e.target.value)}>
          <option>Select Loan</option>
          {loanStatus.map(l => <option key={l}>{l}</option>)}
        </select>

        <select onChange={e => setValue("exterior", e.target.value)}>
          <option>Exterior Condition</option>
          {exteriorOptions.map(e => <option key={e}>{e}</option>)}
        </select>

        <select onChange={e => setValue("interior", e.target.value)}>
          <option>Interior Condition</option>
          {interiorOptions.map(i => <option key={i}>{i}</option>)}
        </select>

        <select onChange={e => setValue("tyre", e.target.value)}>
          <option>Tyre Condition</option>
          {tyreOptions.map(t => <option key={t}>{t}</option>)}
        </select>

        <div className="field">
          <input 
            value={sellerName}
            onChange={e => setSellerName(e.target.value)}
            required
          />
          <label>Seller Name</label>
        </div>

        <div className="field">
          <input 
            value={sellerPhone}
            onChange={e => setSellerPhone(e.target.value)}
            required
          />
          <label>Contact Number</label>
        </div>

        <div className="field">
          <select value={listingDuration} onChange={e => setListingDuration(Number(e.target.value))} required>
            <option value={10}>List for 10 Days</option>
            <option value={20}>List for 20 Days</option>
          </select>
        </div>

<div className="sell-type-toggle">
  <span>
  I want to sell to
  </span>

  <button
    className={sellType === "Individual" ? "active" : ""}
    onClick={() => setSellType("Individual")}
  >
    Individual
  </button>
</div>
        {/* PRICE GUIDE */}

        <div className="price-guide">

          <h3>Price Guide</h3>

          {fairPrice > 0 ? (
            <>
              <h2>
                ₹ {fairPrice.toLocaleString("en-IN")} - ₹ {goodPrice.toLocaleString("en-IN")}
              </h2>

              <p>
                Dealer: ₹ {dealerPrice.toLocaleString("en-IN")}
              </p>

              <div className="price-bar">
                <span className="dot" style={{ left: `${fairPos}%` }}></span>
                <span className="dot" style={{ left: `${goodPos}%` }}></span>
              </div>

              <div className="price-labels">
                <div>
                  <p>Fair condition</p>
                  <h4>₹ {fairPrice.toLocaleString("en-IN")}</h4>
                </div>

                <div>
                  <p>Good condition</p>
                  <h4>₹ {goodPrice.toLocaleString("en-IN")}</h4>
                </div>

                <div>
                  <p>Excellent condition</p>
                  <h4>₹ {excellentPrice.toLocaleString("en-IN")}</h4>
                </div>
              </div>
            </>
          ) : (
            <p>Fill details to get price</p>
          )}

        </div>

        {/* IMAGE */}

        <div
          className="drop-zone"
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            setImages([...images, ...e.dataTransfer.files]);
          }}
        >
          Drag & Drop Images
          <input type="file" multiple onChange={(e) => setImages([...images, ...e.target.files])} />
        </div>

        <div className="preview">
          {images.map((img, i) => (
            <img key={i} src={URL.createObjectURL(img)} alt="preview" />
          ))}
        </div>

        <button className="publish-btn" onClick={handlePublish}>
          🚀 Post to Used Cars
        </button>

      </div>
    </div>
  );
}