import { useLocation } from "react-router-dom";

export default function UsedCarDetails(){

const {state:car}=useLocation();

if(!car) return <div>No car</div>;

return(
<div className="details">

{/* BIG IMAGE */}
<div className="gallery">
<img src={`http://localhost:5050/${car.images?.[0]}`} />
</div>

{/* RIGHT INFO */}
<div className="info">

<h1>{car.name}</h1>

<div className="tags">
<span>{car.year}</span>
<span>{car.km} km</span>
<span>{car.owners}</span>
</div>

<h2>₹ {car.price}</h2>

<button className="buy">Book Test Drive</button>

</div>

{/* OVERVIEW */}
<div className="overview">

<h3>Car Overview</h3>

<div className="grid">
<p>Year: {car.year}</p>
<p>KM: {car.km}</p>
<p>Owner: {car.owners}</p>
<p>City: {car.city}</p>
</div>

</div>

</div>
);
}