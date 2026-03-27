import { useState, useEffect } from "react";
import "./slider.css";

export default function CarImageSlider({ images }) {

  const [index,setIndex] = useState(0);

  useEffect(()=>{
    const timer = setInterval(()=>{
      setIndex(i => (i+1) % images.length);
    },3000);
    return ()=>clearInterval(timer);
  },[images.length]);

  return (
    <div className="slider">

      <img src={images[index]} className="slide-img"/>

      <div className="dots">
        {images.map((_,i)=>(
          <span
            key={i}
            className={i===index?"dot active":"dot"}
            onClick={()=>setIndex(i)}
          />
        ))}
      </div>

    </div>
  );
}
