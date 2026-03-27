import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./App.css";

export default function NewCars() {

  const navigate = useNavigate();
  const [activeBrand, setActiveBrand] = useState(null);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  // 🚗 MODELS WITH IMAGES
  const carModels = [
    { brand: "Tata", name: "Nexon", price: 850000, img: "/cars/nexon.jpg" },
    { brand: "Tata", name: "Harrier", price: 1500000, img: "/cars/harrier.jpg" },
    { brand: "Tata", name: "Punch", price: 650000, img: "/cars/punch.jpg" },
    { brand: "Tata", name: "Safari", price: 1700000, img: "/cars/safari.jpg" },
    { brand: "Tata", name: "Tiago", price: 550000, img: "/cars/tiago.jpg" },
    { brand: "Tata", name: "Altroz", price: 750000, img: "/cars/altroz.jpg" },
    { brand: "Mahindra", name: "Thar", price: 1200000, img: "/cars/thar.jpg" },
    { brand: "Mahindra", name: "XUV300", price: 900000, img: "/cars/xuv300.jpg" },
    { brand: "Mahindra", name: "XUV700", price: 1300000, img: "/cars/xuv700.jpg" },
    { brand: "Mahindra", name: "Scorpio", price: 1100000, img: "/cars/scorpio.jpg" },
    { brand: "Mahindra", name: "Bolero", price: 800000, img: "/cars/bolero.jpg" },

    { brand: "Maruti", name: "Swift", price: 650000, img: "/cars/swift.jpg" },
    { brand: "Maruti", name: "Baleno", price: 800000, img: "/cars/baleno.jpg" },
    { brand: "Maruti", name: "Alto", price: 400000, img: "/cars/alto.jpg" },
    { brand: "Maruti", name: "Dzire", price: 750000, img: "/cars/dzire.jpg" },
    { brand: "Maruti", name: "Ertiga", price: 900000, img: "/cars/ertiga.jpg" },
    { brand: "Maruti", name: "Brezza", price: 1100000, img: "/cars/brezza.jpg" },
    { brand: "Maruti", name: "Celerio", price: 500000, img: "/cars/celerio.jpg" },

    { brand: "Hyundai", name: "Creta", price: 1200000, img: "/cars/creta.jpg" },
    { brand: "Hyundai", name: "Venue", price: 750000, img: "/cars/venue.jpg" },

    { brand: "BMW", name: "X1", price: 4500000, img: "/cars/x1.jpg" },
    { brand: "BMW", name: "X3", price: 6200000, img: "/cars/x3.jpg" },
    { brand: "BMW", name: "X5", price: 8500000, img: "/cars/x5.jpg" },
    { brand: "BMW", name: "3 Series", price: 5000000, img: "/cars/3series.jpg" },
    { brand: "BMW", name: "5 Series", price: 7000000, img: "/cars/5series.jpg" },
    { brand: "Audi", name: "A6", price: 5500000, img: "/cars/a6.jpg" },

    { brand: "Audi", name: "A4", price: 4800000, img: "/cars/a4.jpg" },
    { brand: "Audi", name: "Q3", price: 4200000, img: "/cars/q3.jpg" },
    { brand: "Audi", name: "Q5", price: 6000000, img: "/cars/q5.jpg" },
    { brand: "Audi", name: "Q7", price: 7500000, img: "/cars/q7.jpg" },
    { brand: "Kia", name: "Seltos", price: 1000000, img: "/cars/seltos.jpg" },
    { brand: "Kia", name: "Sonet", price: 900000, img: "/cars/sonet.jpg" },
    { brand: "Kia", name: "Carens", price: 1100000, img: "/cars/carens.jpg" },
    { brand: "Toyota", name: "Fortuner", price: 3000000, img: "/cars/fortuner.jpg" },
    { brand: "Toyota", name: "Innova", price: 2000000, img: "/cars/innova.jpg" },
    { brand: "Toyota", name: "Glanza", price: 800000, img: "/cars/glanza.jpg" },
    { brand: "Toyota", name: "Hyryder", price: 1500000, img: "/cars/hyryder.jpg" },

    { brand: "Mercedes", name: "C Class", price: 5200000, img: "/cars/cclass.jpg" },
    { brand: "Mercedes", name: "E Class", price: 7000000, img: "/cars/eclass.jpg" },
    { brand: "Mercedes", name: "GLA", price: 6000000, img: "/cars/gla.jpg" },
    { brand: "Mercedes", name: "GLC", price: 7500000, img: "/cars/glc.jpg" },
    { brand: "Volkswagen", name: "Polo", price: 700000, img: "/cars/polo.jpg" },
    { brand: "Volkswagen", name: "Virtus", price: 900000, img: "/cars/virtus.jpg" },
    { brand: "Volkswagen", name: "Taigun", price: 1100000, img: "/cars/taigun.jpg" },
    { brand: "Skoda", name: "Rapid", price: 900000, img: "/cars/rapid.jpg" },
    { brand: "Skoda", name: "Slavia", price: 1100000, img: "/cars/slavia.jpg" },
    { brand: "Skoda", name: "Kushaq", price: 1300000, img: "/cars/kushaq.jpg" },
    { brand: "Lamborghini", name: "Huracan", price: 30000000, img: "/cars/huracan.jpg" },
    { brand: "Jaguar", name: "F-Pace", price: 6000000, img: "/cars/fpace.jpg" },
    { brand: "Ferrari", name: "488 GTB", price: 35000000, img: "/cars/488gtb.jpg" },
    { brand: "Porsche", name: "911", price: 12000000, img: "/cars/911.jpg" },
    { brand: "Volvo", name: "XC90", price: 8000000, img: "/cars/xc90.jpg" },
    { brand: "Renault", name: "Duster", price: 900000, img: "/cars/duster.jpg" },
    { brand: "MG", name: "Hector", price: 1300000, img: "/cars/hector.jpg" },
    { brand: "Tesla", name: "Model 3", price: 3500000, img: "/cars/model3.jpg" },
    { brand: "Ford", name: "EcoSport", price: 900000, img: "/cars/ecosport.jpg" },
    { brand: "Chevrolet", name: "Cruze", price: 1500000, img: "/cars/cruze.jpg" },
    { brand: "Nissan", name: "Magnite", price: 800000, img: "/cars/magnite.jpg" },
    { brand: "Honda", name: "City", price: 1100000, img: "/cars/city.jpg" },
    { brand: "Jeep", name: "Compass", price: 2000000, img: "/cars/compass.jpg" },
    { brand: "Dodge", name: "Challenger", price: 4000000, img: "/cars/challenger.jpg" },
    { brand: "Cadillac", name: "XT5", price: 6000000, img: "/cars/xt5.jpg" },
    { brand: "Bentley", name: "Continental GT", price: 25000000, img: "/cars/continentalgt.jpg" },
    { brand: "Aston Martin", name: "DB11", price: 22000000, img: "/cars/db11.jpg" },
    { brand: "Maserati", name: "Ghibli", price: 18000000, img: "/cars/ghibli.jpg" },
    { brand: "Bugatti", name: "Chiron", price: 300000000, img: "/cars/chiron.jpg" },
    { brand: "McLaren", name: "720S", price: 28000000, img: "/cars/720s.jpg" },
    { brand: "Rolls Royce", name: "Phantom", price: 45000000, img: "/cars/phantom.jpg" },
    { brand: "Mini", name: "Cooper", price: 700000, img: "/cars/cooper.jpg" },
    { brand: "Land Rover", name: "Defender", price: 9000000, img: "/cars/defender.jpg" },
    { brand: "Lexus", name: "RX", price: 8500000, img: "/cars/rx.jpg" },
    { brand: "Citroen", name: "C5 Aircross", price: 2500000, img: "/cars/c5aircross.jpg" },
    { brand: "BYD", name: "Atto 3", price: 3500000, img: "/cars/atto3.jpg" },
    { brand: "Great Wall", name: "Haval H6", price: 2000000, img: "/cars/havalh6.jpg" },
    { brand: "Isuzu", name: "D-Max", price: 1500000, img: "/cars/dmax.jpg" },
    { brand: "Force Motors", name: "Gurkha", price: 1200000, img: "/cars/gurkha.jpg" },
    { brand: "Force Motors", name: "Trax", price: 800000, img: "/cars/trax.jpg" },
    {brand: "Force Motors", name: "Traveller", price: 2500000, img: "/cars/traveller.jpg" },
    {brand:"Porsche", name:"Cayenne", price: 9000000, img:"/cars/cayenne.jpg" },
    {brand:"Porsche", name:"Macan", price: 7000000, img:"/cars/macan.jpg" },
    {brand:"Porsche", name:"Panamera", price: 15000000, img:"/cars/panamera.jpg" },
    {brand:"Ferrari", name:"Portofino", price: 25000000, img:"/cars/portofino.jpg" },
    {brand:"Ferrari", name:"Roma", price: 20000000, img:"/cars/roma.jpg" },
    {brand:"Lamborghini", name:"Aventador", price: 40000000, img:"/cars/aventador.jpg" },
    {brand:"Lamborghini", name:"Urus", price: 35000000, img:"/cars/urus.jpg" },
    {brand:"Lamborghini", name:"Gallardo", price: 30000000, img:"/cars/gallardo.jpg" },
    {brand:"Jaguar", name:"XE", price: 4000000, img:"/cars/xe.jpg" },
    {brand:"Jaguar", name:"XF", price: 5000000, img:"/cars/xf.jpg" },
    {brand:"Jaguar", name:"XJ", price: 6000000, img:"/cars/xj.jpg" },
    {brand:"Maserati", name:"Levante", price: 12000000, img:"/cars/levante.jpg" },
    {brand:"Maserati", name:"Quattroporte", price: 15000000, img:"/cars/quattroporte.jpg" },
    {brand:"Mini", name:"Countryman", price: 800000, img:"/cars/countryman.jpg" },
    {brand:"Mini", name:"Clubman", price: 750000, img:"/cars/clubman.jpg" },
    {brand:"Rolls Royce", name:"Cullinan", price: 50000000, img:"/cars/cullinan.jpg" },
    {brand:"Rolls Royce", name:"Dawn", price: 40000000, img:"/cars/dawn.jpg" },
    {brand:"Rolls Royce", name:"Wraith", price: 45000000, img:"/cars/wraith.jpg" },
    {brand:"volkswagen", name:"Vento", price: 800000, img:"/cars/vento.jpg" },
    {brand:"bentley", name:"Bentayga", price: 25000000, img:"/cars/bentayga.jpg" },
    {brand:"bentley", name:"Flying Spur", price: 30000000, img:"/cars/flyingspur.jpg" },
    {brand:"Tata", name:"Sierra", price: 1400000, img:"/cars/sierra.jpg" },
    {brand:"Tata", name:"Sierra EV", price: 2000000, img:"/cars/sierraev.jpg" },
    {brand:"Renault", name:"Kwid", price: 900000, img:"/cars/kwid.jpg" },
    {brand:"Renault", name:"Triber", price: 1000000, img:"/cars/triber.jpg" },
  ];

  const brands = [
  { name: "Tata", img: "/logos/tata.png" },
  { name: "Maruti", img: "/logos/maruti.png" },
  { name: "Mahindra", img: "/logos/mahindra.png" },
  { name: "Hyundai", img: "/logos/hyundai.png" },
  { name: "Toyota", img: "/logos/toyota.png" },
  { name: "Kia", img: "/logos/kia.png" },
  { name: "BMW", img: "/logos/bmw.png" },
  { name: "Audi", img: "/logos/Audi.png" },
  { name: "Mercedes", img: "/logos/mercedes.png" },
  { name: "Volkswagen", img: "/logos/vw.png" },
  { name: "Skoda", img: "/logos/skoda.png" },
  { name: "Lamborghini", img: "/logos/lamborghini.png" },
  { name: "Jaguar", img: "/logos/jaguar.png" },
  { name: "Ferrari", img: "/logos/ferrari.png" },
  { name: "Porsche", img: "/logos/porsche.png" },
  { name: "Volvo", img: "/logos/volvo.png" },
  {name: "Renault", img: "/logos/renault.png" },
  { name: "MG", img: "/logos/mg.png" },
  {name:"Tesla", img:"/logos/tesla.png" },
  { name: "Ford", img: "/logos/ford.png" },
  { name: "Chevrolet", img: "/logos/chevrolet.png" },
  { name: "Nissan", img: "/logos/nissan.png" },
  { name: "Honda", img: "/logos/honda.png" },
  {name:"Jeep", img:"/logos/jeep.png" },
  { name: "Dodge", img: "/logos/dodge.png" },
  { name: "Cadillac", img: "/logos/cadillac.png" },
  {name:"Bentley", img:"/logos/bentley.png" },
  { name: "Aston Martin", img: "/logos/astonmartin.png" },
  {name:"Maserati", img:"/logos/maserati.png" },
  { name: "Bugatti", img: "/logos/bugatti.png" },
  { name: "McLaren", img: "/logos/mclaren.png" },
  { name: "Rolls Royce", img: "/logos/rollsroyce.png" },
  { name: "Mini", img: "/logos/mini.png" },
  {name:"Land Rover", img:"/logos/landrover.png" },
  {name:"Lexus", img:"/logos/lexus.png" },
  {name:"citroen", img:"/logos/citroen.png" },
  {name:"BYD", img:"/logos/byd.png" },
  {name:"Great Wall", img:"/logos/greatwall.png" },
  {name:"Isuzu", img:"/logos/isuzu.png" },
  {name:"Force Motors", img:"/logos/forcemotors.png" },
  
  
];

  // 🔍 FILTER LOGIC
  const filteredCars = carModels.filter(car => {
    const matchBrand = activeBrand ? car.brand === activeBrand : true;
    const aboveMin = minPrice ? car.price >= Number(minPrice) : true;
    const belowMax = maxPrice ? car.price <= Number(maxPrice) : true;
    return matchBrand && aboveMin && belowMax;
  });

  return (
    <div className="newcars-page">
      <div className="back-btn" onClick={() => navigate("/")}>
       ← Back to HUB Cars
      </div>


      <h1>New Cars</h1>
      <p className="subtitle">Explore latest models with images & prices</p>

      {/* ===== BRAND LOGOS ===== */}
      <div className="brand-grid-pro">

        {brands.map(b => (
          <div
            key={b.name}
            className={`brand-card-pro ${activeBrand === b.name ? "active" : ""}`}
            onClick={() => setActiveBrand(b.name)}
          >
            <img src={b.img} alt={b.name} />
            <span>{b.name}</span>
          </div>
        ))}

        <div
          className="brand-card-pro show-all"
          onClick={() => setActiveBrand(null)}
       >
          <span className="show-all-text">Show All</span>
        </div>


      </div>

      {/* ===== PRICE FILTER ===== */}
      <div className="price-box">

        <input
          type="number"
          placeholder="Min ₹"
          value={minPrice}
          onChange={e => setMinPrice(e.target.value)}
        />

        <input
          type="number"
          placeholder="Max ₹"
          value={maxPrice}
          onChange={e => setMaxPrice(e.target.value)}
        />

      </div>

      {/* ===== CAR MODELS ===== */}
      <div className="models-grid">

        {filteredCars.length === 0 && (
          <p className="no-results">No cars found 😢</p>
        )}

        {filteredCars.map((car, i) => (
          <div className="model-card pro" key={i}>

            <img src={car.img} alt={car.name} />

            <div className="model-info">
              <h3>{car.name}</h3>
              <span className="brand-name">{car.brand}</span>
              <h2>₹ {car.price.toLocaleString()}</h2>
              <button onClick={() => navigate(`/car/${encodeURIComponent(car.name)}`)}>
                View Details
              </button>


            </div>

          </div>
        ))}

      </div>

    </div>
  );
}
