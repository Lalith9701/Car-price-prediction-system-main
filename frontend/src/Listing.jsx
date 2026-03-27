import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Listing(){

const [cars,setCars]=useState([]);
const navigate=useNavigate();

/* fetch cars */
useEffect(()=>{
fetch("http://localhost:5050/cars")
.then(res=>res.json())
.then(data=>setCars(data))
.catch(e=>console.log(e));
},[]);

return(
<div className="used-page">

<h1 className="title">Used Cars</h1>

<div className="car-grid">

{cars.map(car=>{

const img =
car.images && car.images.length>0
? `http://localhost:5050/${car.images[0]}`
: "https://via.placeholder.com/400x250";

return(

<div
className="car-card"
key={car.id}
onClick={()=>navigate(`/used/${car.id}`,{state:car})}
>

{/* IMAGE */}
<img src={img} alt="car"/>

{/* NAME */}
<h3>{car.name}</h3>

{/* BASIC */}
<p className="basic">
{car.year} • {car.km} km • {car.fuel || "Fuel"} • {car.transmission || "Transmission"}
</p>

{/* EXTRA SPEC */}
<div className="specs">
<span>👤 {car.owners || "Owner"}</span>
<span>📍 {car.city || "City"}</span>
</div>

{/* PRICE */}
<strong className="price">₹ {car.price}</strong>

</div>

);

})}

</div>
</div>
);
}