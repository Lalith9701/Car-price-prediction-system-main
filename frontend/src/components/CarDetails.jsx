
export default function CarDetails({car}){
  return (
    <div>
      <h2>{car.name}</h2>
      <p>Year: {car.year}</p>
      <p>KM: {car.km}</p>
    </div>
  )
}
