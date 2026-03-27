
import { useEffect, useState } from 'react'
import { API } from '../services/api'
import CarCard from '../components/CarCard'

export default function Listings(){
  const [cars, setCars] = useState([])

  useEffect(()=>{
    API.get('/cars').then(res=>setCars(res.data))
  },[])

  return cars.map(car => <CarCard key={car._id} car={car} />)
}
