import { useEffect, useState } from "react";

export default function MileageCounter({ value }) {

  const [count,setCount] = useState(0);

  useEffect(()=>{
    let start = 0;
    const speed = 20;

    const timer = setInterval(()=>{
      start += 1;
      if(start >= value){
        start = value;
        clearInterval(timer);
      }
      setCount(start);
    },speed);

  },[value]);

  return (
    <span>{count} km/l</span>
  );
}
