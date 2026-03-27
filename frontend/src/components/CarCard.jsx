import { motion } from "framer-motion";

const cars = [
  {
    name: "Tata Nexon",
    price: "₹8.5L - ₹15L",
    image: "/cars/nexon.jpg",
    fuel: "Petrol / Diesel",
    km: "0 km",
    transmission: "Manual / Auto"
  },
  {
    name: "Hyundai Venue",
    price: "₹7.5L - ₹14L",
    image: "/cars/venue.jpg",
    fuel: "Petrol",
    km: "0 km",
    transmission: "Manual / Auto"
  },
  {
    name: "Maruti Swift",
    price: "₹6.5L - ₹9L",
    image: "/cars/swift.jpg",
    fuel: "Petrol",
    km: "0 km",
    transmission: "Manual"
  }
];

export default function CarGrid() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      <h2 className="text-2xl font-bold mb-6">Featured Cars</h2>

      <div className="grid md:grid-cols-3 gap-6">
        {cars.map((car, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -6 }}
            className="bg-white/60 backdrop-blur-lg rounded-xl shadow-lg overflow-hidden"
          >
            <img
              src={car.image}
              alt={car.name}
              className="h-44 w-full object-cover"
            />

            <div className="p-4">
              <h3 className="font-semibold">{car.name}</h3>
              <p className="text-blue-600 font-bold">{car.price}</p>

              <div className="text-sm text-gray-600 mt-2 space-y-1">
                <div>⛽ {car.fuel}</div>
                <div>🚗 {car.km}</div>
                <div>⚙️ {car.transmission}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
