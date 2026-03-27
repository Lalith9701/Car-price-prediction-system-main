import { motion } from "framer-motion";

const brands = [
  "Tata","Maruti","Hyundai","Toyota",
  "Kia","BMW","Audi","Mercedes"
];

export default function BrandSlider() {
  return (
    <div className="mt-12 overflow-x-auto">
      <div className="flex gap-6 px-6">
        {brands.map(b => (
          <motion.div
            key={b}
            whileHover={{ y: -6 }}
            className="min-w-[120px] h-24
                       bg-white/70 backdrop-blur
                       rounded-2xl shadow
                       flex items-center justify-center
                       font-semibold cursor-pointer"
          >
            {b}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
