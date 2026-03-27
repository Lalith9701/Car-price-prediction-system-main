import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import BookingModal from "./BookingModal";
import { useEffect } from "react";


import "./App.css";


/* 🚗 FULL PROFESSIONAL CAR DATABASE */

const cars = {
  Nexon: {
    name: "Tata Nexon",
    price: "₹8.5L - ₹15L",
    year: "2023",
    km: "0",
    owners: "New",
    mileage: "17 km/l",
    fuel: "Petrol / Diesel",
    rating: 4.6,
    images: ["/cars/nexon.jpg", "/cars/nexon2.jpg", "/cars/nexon3.jpg"],
    variants: [
      { name: "Smart", price: "₹8.5L", features: ["Manual", "2 Airbags"] },
      { name: "Creative", price: "₹10.2L", features: ["Sunroof", "Cruise"] },
      { name: "Fearless", price: "₹13.5L", features: ["ADAS", "360 Cam"] }
    ],
    reviews: [
      { user: "Rahul", rating: 5, text: "Best SUV in segment!" },
      { user: "Priya", rating: 4, text: "Smooth & comfortable" }
    ]
  },
 Punch: {
  name: "Tata Punch",
  price: "₹6.25L – ₹11.75L",
  year: "2025",
  km: "0",
  owners: "New",
  mileage: "20.1 km/l",
  fuel: "Petrol / CNG",
  rating: 4.5,
  images: [
    "/cars/punch.jpg",
    "/cars/punch2.jpg",
    "/cars/punch3.jpg",
    "/cars/punch4.jpg"
  ],
  variants: [
    { name: "Pure", price: "₹6.25L", features: ["Manual", "2 Airbags"] },
    { name: "Adventure", price: "₹8.4L", features: ["Touchscreen", "Cruise Control"] },
    { name: "Creative", price: "₹9.9L", features: ["Wireless Android Auto", "Rear Camera"] },
    { name: "Accomplished", price: "₹11.75L", features: ["360° Camera", "Alloy Wheels"] }
  ],
  reviews: [
    { user: "Rahul", rating: 5, text: "Best micro SUV for Indian roads!" },
    { user: "Priya", rating: 4, text: "Very comfortable for city driving." },
    { user: "Vikram", rating: 4, text: "Good ground clearance and strong build quality." }
  ]
},

  Harrier: {
    name: "Tata Harrier",
    price: "₹15L - ₹25L",
    year: "2023",
    km: "0",
    owners: "New",
    mileage: "16 km/l",
    fuel: "Diesel",
    rating: 4.5,
    images: ["/cars/harrier.jpg", "/cars/harrier2.jpg", "/cars/harrier3.jpg","/cars/harrier4.jpg"],
    variants: [
      { name: "Pure", price: "₹15L", features: ["Touchscreen"] },
      { name: "Adventure", price: "₹19L", features: ["Panoramic Roof"] }
    ],
    reviews: [{ user: "Vikas", rating: 5, text: "Powerful SUV!" }]
  },

  Swift: {
    name: "Maruti Swift",
    price: "₹6.5L - ₹9L",
    year: "2023",
    km: "0",
    owners: "New",
    mileage: "22 km/l",
    fuel: "Petrol",
    rating: 4.4,
    images: ["/cars/swift.jpg", "/cars/swift2.jpg", "/cars/swift3.jpg","/cars/swift4.jpg"],
    variants: [
      { name: "LXi", price: "₹6.5L", features: ["Manual"] },
      { name: "ZXi", price: "₹9L", features: ["Touchscreen"] }
    ],
    reviews: [{ user: "Amit", rating: 5, text: "Best mileage!" }]
  },

  Baleno: {
    name: "Maruti Baleno",
    price: "₹8L - ₹12L",
    year: "2023",
    km: "0",
    owners: "New",
    mileage: "23 km/l",
    fuel: "Petrol",
    rating: 4.5,
    images: ["/cars/baleno.jpg", "/cars/baleno2.jpg", "/cars/baleno3.jpg","/cars/baleno4.jpg"],
    variants: [
      { name: "Sigma", price: "₹8L", features: ["Basic"] },
      { name: "Alpha", price: "₹12L", features: ["HUD Display"] }
    ],
    reviews: [{ user: "Karan", rating: 4, text: "Very smooth!" }]
  },

  Venue: {
    name: "Hyundai Venue",
    price: "₹7.5L - ₹14L",
    year: "2023",
    km: "0",
    owners: "New",
    mileage: "20 km/l",
    fuel: "Petrol",
    rating: 4.3,
    images: ["/cars/venue.jpg", "/cars/venue2.jpg", "/cars/venue3.jpg","/cars/venue4.jpg"],
    variants: [
      { name: "E", price: "₹7.5L", features: ["Manual"] },
      { name: "SX", price: "₹14L", features: ["Sunroof"] }
    ],
    reviews: [{ user: "Ravi", rating: 4, text: "Great compact SUV!" }]
  },

  X1: {
    name: "BMW X1",
    price: "₹45L+",
    year: "2023",
    km: "0",
    owners: "New",
    mileage: "14 km/l",
    fuel: "Petrol",
    rating: 4.8,
    images: ["/cars/x1.jpg"],
    variants: [
      { name: "Sport", price: "₹45L", features: ["Luxury Seats"] },
      { name: "Luxury", price: "₹49L", features: ["ADAS"] }
    ],
    reviews: [{ user: "Arjun", rating: 5, text: "Pure luxury!" }]
  },

  X3: {
    name: "BMW X3",
    price: "₹62L+",
    year: "2023",
    km: "0",
    owners: "New",
    mileage: "13 km/l",
    fuel: "Petrol",
    rating: 4.9,
    images: ["/cars/x3.jpg"],
    variants: [{ name: "Luxury", price: "₹62L+", features: ["Sport Mode"] }],
    reviews: [{ user: "Rohit", rating: 5, text: "Beast!" }]
  },

  A4: {
    name: "Audi A4",
    price: "₹48L+",
    year: "2023",
    km: "0",
    owners: "New",
    mileage: "15 km/l",
    fuel: "Petrol",
    rating: 4.7,
    images: ["/cars/a4.jpg"],
    variants: [{ name: "Premium", price: "₹48L+", features: ["Luxury Interior"] }],
    reviews: [{ user: "Sahil", rating: 5, text: "Smooth sedan!" }]
  },

  "C Class": {
    name: "Mercedes C Class",
    price: "₹52L+",
    year: "2023",
    km: "0",
    owners: "New",
    mileage: "14 km/l",
    fuel: "Petrol",
    rating: 4.9,
    images: ["/cars/cclass.jpg"],
    variants: [{ name: "Luxury", price: "₹52L+", features: ["Premium Leather"] }],
    reviews: [{ user: "Nikhil", rating: 5, text: "Classy ride!" }]
  },

  Altroz: {
  name: "Tata Altroz",
  price: "₹6.6L – ₹11.3L",
  year: "2025",
  km: "0",
  owners: "New",
  mileage: "19 – 26 km/l",
  fuel: "Petrol / Diesel / CNG",
  rating: 4.6,
  images: ["/cars/altroz.jpg","/cars/altroz2.jpg","/cars/altroz3.jpg","/cars/altroz4.jpg"],
  variants: [
    { name: "XE", price: "₹6.6L", features: ["Manual", "Dual Airbags"] },
    { name: "XM+", price: "₹8.2L", features: ["Touchscreen", "Bluetooth"] },
    { name: "XZ+", price: "₹10.5L", features: ["Sunroof", "Rear Camera"] }
  ],
  reviews: [
    { user: "Amit", rating: 5, text: "Very safe and solid hatchback!" },
    { user: "Sneha", rating: 4, text: "Comfortable and stylish design." }
  ]
  },

  i20: {
  name: "Hyundai i20",
  price: "₹7.2L – ₹11.8L",
  year: "2025",
  km: "0",
  owners: "New",
  mileage: "20 km/l",
  fuel: "Petrol / Diesel",
  rating: 4.5,
  images: ["/cars/i20.jpg","/cars/i202.jpg","/cars/i203.jpg"],
  variants: [
    { name: "Sportz", price: "₹8.5L", features: ["Touchscreen", "Cruise Control"] },
    { name: "Asta", price: "₹10.2L", features: ["Sunroof", "Digital Cluster"] }
  ],
  reviews: [
    { user: "Karan", rating: 5, text: "Premium feel inside!" },
    { user: "Rohit", rating: 4, text: "Smooth ride and good mileage." }
  ]
},
Thar: {
  name: "Mahindra Thar",
  price: "₹11.35L – ₹17.6L",
  year: "2025",
  km: "0",
  owners: "New",
  mileage: "15 km/l",
  fuel: "Petrol / Diesel",
  rating: 4.7,
  images: ["/cars/thar.jpg","/cars/thar2.jpg","/cars/thar3.jpg","/cars/thar4.jpg","/cars/thar5.jpg"],
  variants: [
    { name: "AX", price: "₹11.35L", features: ["4x4", "Manual"] },
    { name: "LX", price: "₹17.6L", features: ["Hard Top", "Touchscreen"] }
  ],
  reviews: [
    { user: "Arjun", rating: 5, text: "Best off-road SUV in India!" },
    { user: "Manoj", rating: 4, text: "Powerful engine and rugged build." }
  ]
},
911:{
  name: "Porsche 911",
  price: "₹1.5Cr+",
  year: "2023",
  km: "0",
  owners: "New",
  mileage: "10 km/l",
  fuel: "Petrol",
  rating: 4.9,
  images: ["/cars/911.jpg"],
  variants: [
    { name: "Carrera", price: "₹1.5Cr", features: ["Rear Engine", "Sport Mode"] },
    { name: "Turbo S", price: "₹2.5Cr", features: ["All-Wheel Drive", "Porsche Active Suspension Management"] }
  ],
  reviews: [
    { user: "Rohit", rating: 5, text: "Iconic sports car with unmatched performance!" }
  ] 
},
safari:{
  name: "Tata Safari",
  price: "₹17L - ₹25L",
  year: "2023",
  km: "0",
  owners: "New",
  mileage: "16 km/l",
  fuel: "Diesel",
  rating: 4.5,
  images: ["/cars/safari.jpg", "/cars/safari2.jpg", "/cars/safari3.jpg","/cars/safari4.jpg"],
  variants: [
    { name: "XE", price: "₹17L", features: ["Touchscreen"] },
    { name: "XM", price: "₹20L", features: ["Panoramic Roof"] },
    { name: "XMA", price: "₹25L", features: ["ADAS", "360 Cam"] }
  ],
  reviews: [{ user: "Vikas", rating: 5, text: "Powerful and spacious SUV!" }]
},
Tiago:{
  name: "Tata Tiago",
  price: "₹5.5L - ₹7.5L",
  year: "2023",
  km: "0",
  owners: "New",
  mileage: "19 km/l",
  fuel: "Petrol / CNG",
  rating: 4.4,
  images: ["/cars/tiago.jpg", "/cars/tiago2.jpg", "/cars/tiago3.jpg","/cars/tiago4.jpg"],
  variants: [
    { name: "XE", price: "₹5.5L", features: ["Manual"] },
    { name: "XM", price: "₹6.5L", features: ["Touchscreen"] },
    { name: "XZ", price: "₹7.5L", features: ["Sunroof"] }
  ],
  reviews: [{ user: "Amit", rating: 5, text: "Best value for money hatchback!" }] 
},
XUV300:{
  name: "Mahindra XUV300",
  price: "₹9L - ₹12L",
  year: "2023",
  km: "0",
  owners: "New",
  mileage: "18 km/l",
  fuel: "Petrol / Diesel",
  rating: 4.5,
  images: ["/cars/xuv300.jpg", "/cars/xuv300_2.jpg", "/cars/xuv300_3.jpg","/cars/xuv300_4.jpg"],
  variants: [
    { name: "W4", price: "₹9L", features: ["Manual"] },
    { name: "W6", price: "₹10.5L", features: ["Touchscreen"] },
    { name: "W8", price: "₹12L", features: ["Sunroof"] }
  ],
  reviews: [{ user: "Vikram", rating: 5, text: "Compact SUV with great features!" }]
},
XUV700:{
  name: "Mahindra XUV700",
  price: "₹12L - ₹15L",
  year: "2023",
  km: "0",
  owners: "New",
  mileage: "17 km/l",
  fuel: "Petrol / Diesel",
  rating: 4.6,
  images: ["/cars/xuv700.jpg", "/cars/xuv700_2.jpg", "/cars/xuv700_3.jpg","/cars/xuv700_4.jpg"],
  variants: [
    { name: "MX", price: "₹12L", features: ["Manual"] },
    { name: "AX", price: "₹13.5L", features: ["Touchscreen"] },
    { name: "AX7", price: "₹15L", features: ["Sunroof"] }
  ],
  reviews: [{ user: "Manoj", rating: 5, text: "Powerful SUV with amazing design!" }]
},
Scropio:{
  name: "Mahindra Scorpio",
  price: "₹11L - ₹14L",
  year: "2023",
  km: "0",
  owners: "New",
  mileage: "16 km/l",
  fuel: "Petrol / Diesel",
  rating: 4.4,
  images: ["/cars/scorpio.jpg", "/cars/scorpio_2.jpg", "/cars/scorpio_3.jpg","/cars/scorpio_4.jpg"],
  variants: [
    { name: "S3", price: "₹11L", features: ["Manual"] },
    { name: "S5", price: "₹12.5L", features: ["Touchscreen"] },
    { name: "S7", price: "₹14L", features: ["Sunroof"] }
  ],
  reviews: [{ user: "Ravi", rating: 5, text: "Rugged SUV with strong performance!" }]
},
Bolero:{
  name: "Mahindra Bolero",
  price: "₹8L - ₹10L",
  year: "2023",
  km: "0",
  owners: "New",
  mileage: "15 km/l",
  fuel: "Petrol / Diesel",
  rating: 4.3,
  images: ["/cars/bolero.jpg", "/cars/bolero_2.jpg", "/cars/bolero_3.jpg","/cars/bolero_4.jpg"],
  variants: [
    { name: "B4", price: "₹8L", features: ["Manual"] },
    { name: "B6", price: "₹9L", features: ["Touchscreen"] },
    { name: "B6 Plus", price: "₹10L", features: ["Sunroof"] }
  ],
  reviews: [{ user: "Suresh", rating: 5, text: "Sturdy SUV for tough terrains!" }]
},
Alto:{
  name: "Maruti Alto",
  price: "₹4L - ₹5L",
  year: "2023",
  km: "0",
  owners: "New",
  mileage: "22 km/l",
  fuel: "Petrol / CNG",
  rating: 4.2,
  images: ["/cars/alto.jpg", "/cars/alto_2.jpg", "/cars/alto_3.jpg","/cars/alto_4.jpg"],
  variants: [
    { name: "LXi", price: "₹4L", features: ["Manual"] },
    { name: "VXi", price: "₹5L", features: ["Touchscreen"] }
  ],
  reviews: [{ user: "Pooja", rating: 5, text: "Best budget car for city driving!" }]
},
Dzire:{
  name: "Maruti Dzire",
  price: "₹7.5L - ₹9L",
  year: "2023",
  km: "0",
  owners: "New",
  mileage: "24 km/l",
  fuel: "Petrol",
  rating: 4.5,
  images: ["/cars/dzire.jpg", "/cars/dzire_2.jpg", "/cars/dzire_3.jpg","/cars/dzire_4.jpg"],
  variants: [
    { name: "VXi", price: "₹7.5L", features: ["Manual"] },
    { name: "ZXi", price: "₹9L", features: ["Touchscreen"] }
  ],
  reviews: [{ user: "Karan", rating: 5, text: "Comfortable and efficient sedan!" }]
},
Ertiga:{
  name: "Maruti Ertiga",
  price: "₹9L - ₹11L",
  year: "2023",
  km: "0",
  owners: "New",
  mileage: "19 km/l",
  fuel: "Petrol / Diesel",
  rating: 4.4,
  images: ["/cars/ertiga.jpg", "/cars/ertiga_2.jpg", "/cars/ertiga_3.jpg","/cars/ertiga_4.jpg"],
  variants: [
    { name: "VXi", price: "₹9L", features: ["Manual"] },
    { name: "ZXi", price: "₹11L", features: ["Touchscreen"] }
  ],
  reviews: [{ user: "Rohit", rating: 5, text: "Spacious and comfortable MPV!" }]
},
Brezza:{
  name: "Maruti Brezza",
  price: "₹11L - ₹14L",
  year: "2023",
  km: "0",
  owners: "New",
  mileage: "18 km/l",
  fuel: "Petrol / Diesel",
  rating: 4.6,
  images: ["/cars/brezza.jpg", "/cars/brezza_2.jpg", "/cars/brezza_3.jpg","/cars/brezza_4.jpg"],
  variants: [
    { name: "VXi", price: "₹11L", features: ["Manual"] },
    { name: "ZXi", price: "₹14L", features: ["Touchscreen"] }
  ],
  reviews: [{ user: "Sahil", rating: 5, text: "Stylish and feature-packed compact SUV!" }]
},
Celerio:{
  name: "Maruti Celerio",
  price: "₹5L - ₹6L",
  year: "2023",
  km: "0",
  owners: "New",
  mileage: "21 km/l",
  fuel: "Petrol / CNG",
  rating: 4.3,
  images: ["/cars/celerio.jpg", "/cars/celerio_2.jpg", "/cars/celerio_3.jpg","/cars/celerio_4.jpg"],
  variants: [
    { name: "VXi", price: "₹5L", features: ["Manual"] },
    { name: "ZXi", price: "₹6L", features: ["Touchscreen"] }
  ],
  reviews: [{ user: "Priya", rating: 5, text: "Great value for money compact car!" }]
},
Creta:{
  name: "Hyundai Creta",
  price: "₹10.8L - ₹20.2L",
  year: "2023",
  km: "0",
  owners: "New",
  mileage: "18 km/l",
  fuel: "Petrol / Diesel",
  rating: 4.7,
  images: ["/cars/creta.jpg", "/cars/creta2.jpg", "/cars/creta3.jpg","/cars/creta4.jpg"],
  variants: [
    { name: "E", price: "₹10.8L", features: ["Manual"] },
    { name: "SX(O)", price: "₹20.2L", features: ["Vent Seats"] }
  ],
  reviews: [{ user: "Suresh", rating: 5, text: "Premium SUV!" }]
},
X5:{
  name: "BMW X5",
  price: "₹85L+",
  year: "2023",
  km: "0",
  owners: "New",
  mileage: "12 km/l",
  fuel: "Petrol",
  rating: 4.8,
  images: ["/cars/x5.jpg"],
  variants: [
    { name: "Luxury", price: "₹85L+", features: ["M Sport Package", "Panoramic Roof"] }
  ],
  reviews: [{ user: "Arjun", rating: 5, text: "Ultimate luxury SUV with powerful performance!" }]
},
"3 Series":{
  name: "BMW 3 Series",
  price: "₹50L+",
  year: "2023",
  km: "0",
  owners: "New",
  mileage: "14 km/l",
  fuel: "Petrol",
  rating: 4.7,
  images: ["/cars/3series.jpg"],
  variants: [
    { name: "Sport", price: "₹50L+", features: ["M Sport Package", "Digital Cluster"] }
  ],
  reviews: [{ user: "Rohit", rating: 5, text: "Best luxury sedan with sporty handling!" }]
},
"5 Series":{
  name: "BMW 5 Series",
  price: "₹70L+",
  year: "2023",
  km: "0",
  owners: "New",
  mileage: "13 km/l",
  fuel: "Petrol",
  rating: 4.8,
  images: ["/cars/5series.jpg"],
  variants: [
    { name: "Luxury", price: "₹70L+", features: ["Executive Lounge Seats", "Gesture Control"] }
  ],
  reviews: [{ user: "Sahil", rating: 5, text: "Flagship sedan with top-notch luxury and tech!" }]
},
A6:{
  name: "Audi A6",
  price: "₹55L+",
  year: "2023",
  km: "0",
  owners: "New",
  mileage: "15 km/l",
  fuel: "Petrol",
  rating: 4.7,
  images: ["/cars/a6.jpg"],
  variants: [
    { name: "Premium", price: "₹55L+", features: ["Luxury Interior", "Virtual Cockpit"] }
  ],
  reviews: [{ user: "Nikhil", rating: 5, text: "Elegant sedan with excellent performance!" }]
},
Q3:{
  name: "Audi Q3",
  price: "₹35L+",
  year: "2023",
  km: "0",
  owners: "New",
  mileage: "16 km/l",
  fuel: "Petrol",
  rating: 4.6,
  images: ["/cars/q3.jpg"],
  variants: [
    { name: "Premium", price: "₹35L+", features: ["Touchscreen", "Panoramic Roof"] }
  ],
  reviews: [{ user: "Vikram", rating: 5, text: "Compact luxury SUV with great features!" }]
},
Q5:{
  name: "Audi Q5",
  price: "₹45L+",
  year: "2023",
  km: "0",
  owners: "New",
  mileage: "14 km/l",
  fuel: "Petrol",
  rating: 4.7,
  images: ["/cars/q5.jpg"],
  variants: [
    { name: "Premium", price: "₹45L+", features: ["Luxury Interior", "Virtual Cockpit"] }
  ],
  reviews: [{ user: "Manoj", rating: 5, text: "Stylish and powerful luxury SUV!" }]
},
Q7:{
  name: "Audi Q7",
  price: "₹60L+",
  year: "2023",
  km: "0",
  owners: "New",
  mileage: "12 km/l",
  fuel: "Petrol",
  rating: 4.8,
  images: ["/cars/q7.jpg"],
  variants: [
    { name: "Premium", price: "₹60L+", features: ["Three-Row Seating", "Virtual Cockpit"] }
  ],
  reviews: [{ user: "Suresh", rating: 5, text: "Spacious and luxurious SUV with great performance!" }]
},
Seltos: {
  name: "Kia Seltos",
  price: "₹10.9L – ₹20.3L",
  year: "2025",
  km: "0",
  owners: "New",
  mileage: "17 – 20 km/l",
  fuel: "Petrol / Diesel",
  rating: 4.6,
  images: ["/cars/seltos.jpg","/cars/seltos2.jpg","/cars/seltos3.jpg"],
  variants: [
    { name: "HTK", price: "₹10.9L", features: ["Touchscreen", "LED DRL"] },
    { name: "GTX+", price: "₹20.3L", features: ["ADAS", "Ventilated Seats"] }
  ],
  reviews: [
    { user: "Naveen", rating: 5, text: "Very premium compact SUV!" },
    { user: "Pooja", rating: 4, text: "Smooth drive and stylish look." }
  ] 
},
Sonet:{
  name: "Kia Sonet",
  price: "₹7.5L – ₹13L",
  year: "2025",
  km: "0",
  owners: "New",
  mileage: "18 km/l",
  fuel: "Petrol / Diesel",
  rating: 4.5,
  images: ["/cars/sonet.jpg","/cars/sonet2.jpg","/cars/sonet3.jpg"],
  variants: [
    { name: "HTK", price: "₹7.5L", features: ["Touchscreen", "LED DRL"] },
    { name: "GTX+", price: "₹13L", features: ["ADAS", "Ventilated Seats"] }
  ],
  reviews: [
    { user: "Naveen", rating: 5, text: "Great compact SUV with premium features!" },
    { user: "Pooja", rating: 4, text: "Stylish and comfortable for city driving." }
   ]
},
Carens:{
  name: "Kia Carens",
  price: "₹9L – ₹15L",
  year: "2025",
  km: "0",
  owners: "New",
  mileage: "19 km/l",
  fuel: "Petrol / Diesel",
  rating: 4.6,
  images: ["/cars/carens.jpg","/cars/carens2.jpg","/cars/carens3.jpg"],
  variants: [
    { name: "HTK", price: "₹9L", features: ["Touchscreen", "LED DRL"] },
    { name: "GTX+", price: "₹15L", features: ["ADAS", "Ventilated Seats"] }
  ],
  reviews: [
    { user: "Naveen", rating: 5, text: "Spacious and feature-rich MPV!" },
    { user: "Pooja", rating: 4, text: "Perfect for family outings with great comfort." }
  ]
},
Forturer: {
  name: "Toyota Fortuner",
  price: "₹30L - ₹40L",
  year: "2023",
  km: "0",
  owners: "New",
  mileage: "14 km/l",
  fuel: "Petrol / Diesel",
  rating: 4.7,
  images: ["/cars/fortuner.jpg", "/cars/fortuner2.jpg", "/cars/fortuner3.jpg","/cars/fortuner4.jpg"],
  variants: [
    { name: "2.7L MT", price: "₹30L", features: ["Manual", "Basic"] },
    { name: "2.8L AT", price: "₹40L", features: ["Automatic", "Premium"] }
  ],
  reviews: [{ user: "Vikram", rating: 5, text: "Rugged and reliable SUV for all terrains!" }]
},
Innova: {
  name: "Toyota Innova Crysta",
  price: "₹17L - ₹25L",
  year: "2023",
  km: "0",
  owners: "New",
  mileage: "16 km/l",
  fuel: "Petrol / Diesel",
  rating: 4.6,
  images: ["/cars/innova.jpg", "/cars/innova2.jpg", "/cars/innova3.jpg","/cars/innova4.jpg"],
  variants: [
    { name: "2.0L MT", price: "₹17L", features: ["Manual", "Basic"] },
    { name: "2.8L AT", price: "₹25L", features: ["Automatic", "Premium"] }
  ],
  reviews: [{ user: "Manoj", rating: 5, text: "Spacious and comfortable MPV for family trips!" }]
},
Glanza: {
  name: "Toyota Glanza",
  price: "₹7L - ₹9L",
  year: "2023",
  km: "0",
  owners: "New",
  mileage: "19 km/l",
  fuel: "Petrol",
  rating: 4.4,
  images: ["/cars/glanza.jpg", "/cars/glanza2.jpg", "/cars/glanza3.jpg","/cars/glanza4.jpg"],
  variants: [
    { name: "V", price: "₹7L", features: ["Manual", "Basic"] },
    { name: "G", price: "₹9L", features: ["Automatic", "Premium"] }
  ],
  reviews: [{ user: "Rohit", rating: 5, text: "Stylish and efficient hatchback for city driving!" }]
},
Hyryder: {
  name: "Toyota Hyryder",
  price: "₹10L - ₹15L",
  year: "2023",
  km: "0",
  owners: "New",
  mileage: "18 km/l",
  fuel: "Petrol / Diesel",
  rating: 4.5,
  images: ["/cars/hyryder.jpg", "/cars/hyryder2.jpg", "/cars/hyryder3.jpg","/cars/hyryder4.jpg"],
  variants: [
    { name: "E", price: "₹10L", features: ["Manual", "Basic"] },
    { name: "G", price: "₹15L", features: ["Automatic", "Premium"] }
  ],
  reviews: [{ user: "Suresh", rating: 5, text: "Great compact SUV with hybrid efficiency!" }]
},
"E Class": {
  name: "Mercedes E Class",
  price: "₹65L+",
  year: "2023",
  km: "0",
  owners: "New",
  mileage: "12 km/l",
  fuel: "Petrol",
  rating: 4.9,
  images: ["/cars/eclass.jpg"],
  variants: [
    { name: "Luxury", price: "₹65L+", features: ["Premium Leather", "Advanced Safety"] }
  ],
  reviews: [{ user: "Nikhil", rating: 5, text: "Elegant and powerful luxury sedan!" }]
},
GLA: {
  name: "Mercedes GLA",
  price: "₹45L+",
  year: "2023",
  km: "0",
  owners: "New",
  mileage: "14 km/l",
  fuel: "Petrol",
  rating: 4.7,
  images: ["/cars/gla.jpg"],
  variants: [
    { name: "Sport", price: "₹45L+", features: ["M Sport Package", "Panoramic Roof"] }
  ],
  reviews: [{ user: "Vikram", rating: 5, text: "Compact luxury SUV with sporty performance!" }]
},
GLC: {
  name: "Mercedes GLC",
  price: "₹55L+",
  year: "2023",
  km: "0",
  owners: "New",
  mileage: "13 km/l",
  fuel: "Petrol",
  rating: 4.8,
  images: ["/cars/glc.jpg"],
  variants: [
    { name: "Luxury", price: "₹55L+", features: ["Luxury Interior", "Virtual Cockpit"] }
  ],
  reviews: [{ user: "Manoj", rating: 5, text: "Stylish and powerful luxury SUV!" }]
},
Polo: {
  name: "Volkswagen Polo",
  price: "₹6L - ₹9L",
  year: "2023",
  km: "0",
  owners: "New",
  mileage: "18 km/l",
  fuel: "Petrol / Diesel",
  rating: 4.4,
  images: ["/cars/polo.jpg", "/cars/polo2.jpg", "/cars/polo3.jpg","/cars/polo4.jpg"],
  variants: [
    { name: "Trendline", price: "₹6L", features: ["Manual"] },
    { name: "Highline", price: "₹9L", features: ["Touchscreen"] }
  ],
  reviews: [{ user: "Rohit", rating: 5, text: "Fun to drive hatchback with solid build quality!" }]
},
Virtus: {
  name: "Volkswagen Virtus",
  price: "₹10L - ₹14L",
  year: "2023",
  km: "0",
  owners: "New",
  mileage: "16 km/l",
  fuel: "Petrol / Diesel",
  rating: 4.6,
  images: ["/cars/virtus.jpg", "/cars/virtus2.jpg", "/cars/virtus3.jpg","/cars/virtus4.jpg"],
  variants: [
    { name: "Trendline", price: "₹10L", features: ["Manual"] },
    { name: "Highline", price: "₹14L", features: ["Touchscreen"] }
  ],
  reviews: [{ user: "Nikhil", rating: 5, text: "Stylish and spacious sedan with great features!" }]
},
Taigun: {
  name: "Volkswagen Taigun",
  price: "₹11L - ₹16L",
  year: "2023",
  km: "0",
  owners: "New",
  mileage: "15 km/l",
  fuel: "Petrol / Diesel",
  rating: 4.7,
  images: ["/cars/taigun.jpg", "/cars/taigun2.jpg", "/cars/taigun3.jpg","/cars/taigun4.jpg"],
  variants: [
    { name: "Trendline", price: "₹11L", features: ["Manual"] },
    { name: "Highline", price: "₹16L", features: ["Touchscreen"] }
  ],
  reviews: [{ user: "Vikram", rating: 5, text: "Compact SUV with premium features and great performance!" }]
},
Rapid: {
  name: "Skoda Rapid",
  price: "₹7L - ₹11L",
  year: "2023",
  km: "0",
  owners: "New",
  mileage: "18 km/l",
  fuel: "Petrol / Diesel",
  rating: 4.5,
  images: ["/cars/rapid.jpg", "/cars/rapid2.jpg", "/cars/rapid3.jpg","/cars/rapid4.jpg"],
  variants: [
    { name: "Active", price: "₹7L", features: ["Manual"] },
    { name: "Style", price: "₹11L", features: ["Touchscreen"] }
  ],
  reviews: [{ user: "Rohit", rating: 5, text: "Spacious sedan with solid build quality!" }]
},
Slavai: {
  name: "Skoda Slavia",
  price: "₹10L - ₹15L",
  year: "2023",
  km: "0",
  owners: "New",
  mileage: "17 km/l",
  fuel: "Petrol / Diesel",
  rating: 4.6,
  images: ["/cars/slavia.jpg", "/cars/slavia2.jpg", "/cars/slavia3.jpg","/cars/slavia4.jpg"],
  variants: [
    { name: "Active", price: "₹10L", features: ["Manual"] },
    { name: "Style", price: "₹15L", features: ["Touchscreen"] }
  ],
  reviews: [{ user: "Sahil", rating: 5, text: "Stylish and feature-rich sedan with great performance!" }]
},
Kushaq: {
  name: "Skoda Kushaq",
  price: "₹11L - ₹16L",
  year: "2023",
  km: "0",
  owners: "New",
  mileage: "16 km/l",
  fuel: "Petrol / Diesel",
  rating: 4.7,
  images: ["/cars/kushaq.jpg", "/cars/kushaq2.jpg", "/cars/kushaq3.jpg","/cars/kushaq4.jpg"],
  variants: [
    { name: "Active", price: "₹11L", features: ["Manual"] },
    { name: "Style", price: "₹16L", features: ["Touchscreen"] }
  ],
  reviews: [{ user: "Vikram", rating: 5, text: "Compact SUV with premium features and excellent performance!" }]
},
Huracan: {
  name: "Lamborghini Huracan",
  price: "₹3Cr+",
  year: "2023",
  km: "0",
  owners: "New",
  mileage: "8 km/l",
  fuel: "Petrol",
  rating: 4.9,
  images: ["/cars/huracan.jpg"],
  variants: [
    { name: "EVO", price: "₹3Cr+", features: ["V10 Engine", "All-Wheel Drive"] }
  ],
  reviews: [{ user: "Arjun", rating: 5, text: "Exotic supercar with breathtaking performance!" }]
},
"F-Pace": {
  name: "Jaguar F-Pace",
  price: "₹60L+",
  year: "2023",
  km: "0",
  owners: "New",
  mileage: "14 km/l",
  fuel: "Petrol / Diesel",
  rating: 4.7,
  images: ["/cars/fpace.jpg"],
  variants: [
    { name: "Prestige", price: "₹60L+", features: ["Luxury Interior", "Advanced Safety"] }
  ],
  reviews: [{ user: "Manoj", rating: 5, text: "Stylish and powerful luxury SUV with great performance!" }]
},
"488 GTB": {
  name: "Ferrari 488 GTB",
  price: "₹3Cr+",
  year: "2023",
  km: "0",
  owners: "New",
  mileage: "7 km/l",
  fuel: "Petrol",
  rating: 4.9,
  images: ["/cars/488gtb.jpg"],
  variants: [
    { name: "Standard", price: "₹3Cr+", features: ["V8 Engine", "Rear-Wheel Drive"] }
  ],
  reviews: [{ user: "Arjun", rating: 5, text: "Incredible supercar with mind-blowing performance!" }]
},
XC90: {
  name: "Volvo XC90",
  price: "₹80L+",
  year: "2023",
  km: "0",
  owners: "New",
  mileage: "12 km/l",
  fuel: "Petrol / Diesel",
  rating: 4.8,
  images: ["/cars/xc90.jpg"],
  variants: [
    { name: "Inscription", price: "₹80L+", features: ["Luxury Interior", "Advanced Safety"] }
  ],
  reviews: [{ user: "Suresh", rating: 5, text: "Spacious and luxurious SUV with top-notch safety features!" }]
},
Duster: {
  name: "Renault Duster",
  price: "₹8L - ₹12L",
  year: "2023",
  km: "0",
  owners: "New",
  mileage: "19 km/l",
  fuel: "Petrol / Diesel",
  rating: 4.4,
  images: ["/cars/duster.jpg", "/cars/duster2.jpg", "/cars/duster3.jpg","/cars/duster4.jpg"],
  variants: [
    { name: "RxE", price: "₹8L", features: ["Manual"] },
    { name: "RxZ", price: "₹12L", features: ["Touchscreen"] }
  ],
  reviews: [{ user: "Rohit", rating: 5, text: "Rugged and reliable SUV for all terrains!" }]
},
Hector: {
  name: "MG Hector",
  price: "₹12L - ₹18L",
  year: "2023",
  km: "0",
  owners: "New",
  mileage: "17 km/l",
  fuel: "Petrol / Diesel",
  rating: 4.5,
  images: ["/cars/hector.jpg", "/cars/hector2.jpg", "/cars/hector3.jpg","/cars/hector4.jpg"],
  variants: [
    { name: "Style", price: "₹12L", features: ["Manual"] },
    { name: "Sharp", price: "₹18L", features: ["Touchscreen"] }
  ],
  reviews: [{ user: "Vikram", rating: 5, text: "Feature-packed SUV with great value for money!" }]
},
"Model 3": {
  name: "Tesla Model 3",
  price: "₹50L+",
  year: "2023",
  km: "0",
  owners: "New",
  mileage: "Electric",
  fuel: "Electric",
  rating: 4.8,
  images: ["/cars/model3.jpg"],
  variants: [
    { name: "Standard Range Plus", price: "₹50L+", features: ["Electric Motor", "Autopilot"] }
  ],
  reviews: [{ user: "Nikhil", rating: 5, text: "Innovative electric car with impressive performance!" }]
},
Ecosport: {
  name: "Ford EcoSport",
  price: "₹9L - ₹12L",
  year: "2023",
  km: "0",
  owners: "New",
  mileage: "18 km/l",
  fuel: "Petrol / Diesel",
  rating: 4.4,
  images: ["/cars/ecosport.jpg", "/cars/ecosport2.jpg", "/cars/ecosport3.jpg","/cars/ecosport4.jpg"],
  variants: [
    { name: "Ambiente", price: "₹9L", features: ["Manual"] },
    { name: "Titanium", price: "₹12L", features: ["Touchscreen"] }
  ],
  reviews: [{ user: "Rohit", rating: 5, text: "Compact SUV with good performance and features!" }]
},
Cruze: {
  name: "Chevrolet Cruze",
  price: "₹10L - ₹15L",
  year: "2023",
  km: "0",
  owners: "New",
  mileage: "16 km/l",
  fuel: "Petrol / Diesel",
  rating: 4.5,
  images: ["/cars/cruze.jpg", "/cars/cruze2.jpg", "/cars/cruze3.jpg","/cars/cruze4.jpg"],
  variants: [
    { name: "LT", price: "₹10L", features: ["Manual"] },
    { name: "LTZ", price: "₹15L", features: ["Touchscreen"] }
  ],
  reviews: [{ user: "Sahil", rating: 5, text: "Stylish sedan with solid performance and features!" }]
},
Magnite: {
  name: "Nissan Magnite",
  price: "₹5L - ₹10L",
  year: "2023",
  km: "0",
  owners: "New",
  mileage: "18 km/l",
  fuel: "Petrol",
  rating: 4.3,
  images: ["/cars/magnite.jpg", "/cars/magnite2.jpg", "/cars/magnite3.jpg","/cars/magnite4.jpg"],
  variants: [
    { name: "XE", price: "₹5L", features: ["Manual"] },
    { name: "XV", price: "₹10L", features: ["Touchscreen"] }
  ],
  reviews: [{ user: "Pooja", rating: 5, text: "Great value for money compact SUV with good features!" }]
},
City: {
  name: "Honda City",
  price: "₹11L - ₹15L",
  year: "2023",
  km: "0",
  owners: "New",
  mileage: "17 km/l",
  fuel: "Petrol / Diesel",
  rating: 4.6,
  images: ["/cars/city.jpg", "/cars/city2.jpg", "/cars/city3.jpg","/cars/city4.jpg"],
  variants: [
    { name: "V", price: "₹11L", features: ["Manual"] },
    { name: "ZX", price: "₹15L", features: ["Touchscreen"] }
  ],
  reviews: [{ user: "Rohit", rating: 5, text: "Comfortable and efficient sedan with great features!" }]
},
Compass: {
  name: "Jeep Compass",
  price: "₹15L - ₹25L",
  year: "2023",
  km: "0",
  owners: "New",
  mileage: "16 km/l",
  fuel: "Petrol / Diesel",
  rating: 4.5,
  images: ["/cars/compass.jpg", "/cars/compass2.jpg", "/cars/compass3.jpg","/cars/compass4.jpg"],
  variants: [
    { name: "Sport", price: "₹15L", features: ["Manual"] },
    { name: "Limited", price: "₹25L", features: ["Touchscreen"] }
  ],
  reviews: [{ user: "Sahil", rating: 5, text: "Stylish and capable SUV with great off-road performance!" }]
},
Challenger: {
  name: "Dodge Challenger",
  price: "₹70L+",
  year: "2023",
  km: "0",
  owners: "New",
  mileage: "10 km/l",
  fuel: "Petrol",
  rating: 4.7,
  images: ["/cars/challenger.jpg"],
  variants: [
    { name: "R/T", price: "₹70L+", features: ["V8 Engine", "Rear-Wheel Drive"] }
  ],
  reviews: [{ user: "Arjun", rating: 5, text: "Muscle car with aggressive styling and powerful performance!" }]
},
XT5: {
  name: "Cadillac XT5",
  price: "₹60L+",
  year: "2023",
  km: "0",
  owners: "New",
  mileage: "14 km/l",
  fuel: "Petrol",
  rating: 4.6,
  images: ["/cars/xt5.jpg"],
  variants: [
    { name: "Luxury", price: "₹60L+", features: ["Premium Interior", "Advanced Safety"] }
  ],
  reviews: [{ user: "Manoj", rating: 5, text: "Luxurious and spacious SUV with great performance!" }]
},
"Contiental GT": {
  name: "Bentley Continental GT",
  price: "₹3Cr+",
  year: "2023",
  km: "0",
  owners: "New",
  mileage: "8 km/l",
  fuel: "Petrol",
  rating: 4.9,
  images: ["/cars/continentalgt.jpg"],
  variants: [
    { name: "Standard", price: "₹3Cr+", features: ["W12 Engine", "All-Wheel Drive"] }
  ],
  reviews: [{ user: "Arjun", rating: 5, text: "Exquisite grand tourer with unmatched luxury and performance!" }]
},
DB11: {
  name: "Aston Martin DB11",
  price: "₹3Cr+",
  year: "2023",
  km: "0",
  owners: "New",
  mileage: "9 km/l",
  fuel: "Petrol",
  rating: 4.9,
  images: ["/cars/db11.jpg"],
  variants: [
    { name: "V8", price: "₹3Cr+", features: ["V8 Engine", "Rear-Wheel Drive"] }
  ],
  reviews: [{ user: "Arjun", rating: 5, text: "Stunning sports car with elegant design and thrilling performance!" }]
},
Ghili: {
  name: "Maserati Ghili",
  price: "₹2Cr+",
  year: "2023",
  km: "0",
  owners: "New",
  mileage: "10 km/l",
  fuel: "Petrol",
  rating: 4.8,
  images: ["/cars/ghili.jpg"],
  variants: [
    { name: "Standard", price: "₹2Cr+", features: ["V6 Engine", "Rear-Wheel Drive"] }
  ],
  reviews: [{ user: "Arjun", rating: 5, text: "Exotic sports sedan with Italian flair and great performance!" }]
},
Chiron: {
  name: "Bugatti Chiron",
  price: "₹15Cr+",
  year: "2023",
  km: "0",
  owners: "New",
  mileage: "6 km/l",
  fuel: "Petrol",
  rating: 4.9,
  images: ["/cars/chiron.jpg"],
  variants: [
    { name: "Standard", price: "₹15Cr+", features: ["W16 Engine", "All-Wheel Drive"] }
  ],
  reviews: [{ user: "Arjun", rating: 5, text: "Ultimate hypercar with mind-blowing performance and exclusivity!" }]
},
"720S": {
  name: "McLaren 720S",
  price: "₹3Cr+",
  year: "2023",
  km: "0",
  owners: "New",
  mileage: "8 km/l",
  fuel: "Petrol",
  rating: 4.9,
  images: ["/cars/720s.jpg"],
  variants: [
    { name: "Standard", price: "₹3Cr+", features: ["V8 Engine", "Rear-Wheel Drive"] }
  ],
  reviews: [{ user: "Arjun", rating: 5, text: "Incredible supercar with stunning design and exhilarating performance!" }]
},
Phantom: {
  name: "Rolls-Royce Phantom",
  price: "₹5Cr+",
  year: "2023",
  km: "0",
  owners: "New",
  mileage: "10 km/l",
  fuel: "Petrol",
  rating: 4.9,
  images: ["/cars/phantom.jpg"],
  variants: [
    { name: "Standard", price: "₹5Cr+", features: ["V12 Engine", "All-Wheel Drive"] }
  ],
  reviews: [{ user: "Arjun", rating: 5, text: "Luxurious and elegant grand tourer with unmatched comfort!" }]
},
Cooper:{
  name: "Mini Cooper",
  price: "₹25L+",
  year: "2023",
  km: "0",
  owners: "New",
  mileage: "16 km/l",
  fuel: "Petrol",
  rating: 4.7,
  images: ["/cars/cooper.jpg"],
  variants: [
    { name: "Standard", price: "₹25L+", features: ["Turbocharged Engine", "Sporty Handling"] }
  ],
  reviews: [{ user: "Vikram", rating: 5, text: "Fun and stylish compact car with great performance!" }]
},
Defender: {
  name: "Land Rover Defender",
  price: "₹80L+",
  year: "2023",
  km: "0",
  owners: "New",
  mileage: "14 km/l",
  fuel: "Petrol / Diesel",
  rating: 4.8,
  images: ["/cars/defender.jpg"],
  variants: [
    { name: "110", price: "₹80L+", features: ["All-Wheel Drive", "Advanced Terrain Response"] }
  ],
  reviews: [{ user: "Suresh", rating: 5, text: "Iconic and capable SUV with great off-road performance!" }]
},
RX: {
  name: "Lexus RX",
  price: "₹70L+",
  year: "2023",
  km: "0",
  owners: "New",
  mileage: "15 km/l",
  fuel: "Petrol / Hybrid",
  rating: 4.7,
  images: ["/cars/rx.jpg"],
  variants: [
    { name: "RX 350", price: "₹70L+", features: ["Luxury Interior", "Advanced Safety"] }
  ],
  reviews: [{ user: "Manoj", rating: 5, text: "Luxurious and comfortable SUV with great performance!" }]
},
"C5 Aircross": {
  name: "Citroen C5 Aircross",
  price: "₹30L+",
  year: "2023",
  km: "0",
  owners: "New",
  mileage: "16 km/l",
  fuel: "Petrol / Diesel",
  rating: 4.5,
  images: ["/cars/c5aircross.jpg"],
  variants: [
    { name: "Standard", price: "₹30L+", features: ["Comfortable Suspension", "Spacious Interior"] }
  ],
  reviews: [{ user: "Sahil", rating: 5, text: "Comfortable and stylish SUV with great value for money!" }]
},
"Atto 3": {
  name: "BYD Atto 3",
  price: "₹30L+",
  year: "2023",
  km: "0",
  owners: "New",
  mileage: "Electric",
  fuel: "Electric",
  rating: 4.6,
  images: ["/cars/atto3.jpg"],
  variants: [
    { name: "Standard", price: "₹30L+", features: ["Electric Motor", "Advanced Infotainment"] }
  ],
  reviews: [{ user: "Nikhil", rating: 5, text: "Innovative electric SUV with great performance and features!" }]
},
"Haval H6": {
  name: "Haval H6",
  price: "₹15L - ₹20L",
  year: "2023",
  km: "0",
  owners: "New",
  mileage: "17 km/l",
  fuel: "Petrol / Diesel",
  rating: 4.4,
  images: ["/cars/havalh6.jpg", "/cars/havalh62.jpg", "/cars/havalh63.jpg","/cars/havalh64.jpg"],
  variants: [
    { name: "Standard", price: "₹15L", features: ["Manual"] },
    { name: "Premium", price: "₹20L", features: ["Touchscreen"] }
  ],
  reviews: [{ user: "Rohit", rating: 5, text: "Stylish and feature-rich SUV with great value for money!" }]
},
"D-max": {
  name: "Isuzu D-max",
  price: "₹15L - ₹25L",
  year: "2023",
  km: "0",
  owners: "New",
  mileage: "14 km/l",
  fuel: "Diesel",
  rating: 4.5,
  images: ["/cars/dmax.jpg", "/cars/dmax2.jpg", "/cars/dmax3.jpg","/cars/dmax4.jpg"],
  variants: [
    { name: "Standard", price: "₹15L", features: ["Manual"] },
    { name: "Premium", price: "₹25L", features: ["Touchscreen"] }
  ],
  reviews: [{ user: "Suresh", rating: 5, text: "Rugged and reliable pickup truck with great performance!" }]
},
Gurkha: {
  name: "Force Gurkha",
  price: "₹15L - ₹20L",
  year: "2023",
  km: "0",
  owners: "New",
  mileage: "12 km/l",
  fuel: "Petrol / Diesel",
  rating: 4.4,
  images: ["/cars/gurkha.jpg", "/cars/gurkha2.jpg", "/cars/gurkha3.jpg","/cars/gurkha4.jpg"],
  variants: [
    { name: "Standard", price: "₹15L", features: ["Manual"] },
    { name: "Premium", price: "₹20L", features: ["Touchscreen"] }
  ],
  reviews: [{ user: "Vikram", rating: 5, text: "Rugged and capable SUV with great off-road performance!" }]
},
Trax: {
  name: "Chevrolet Trax",
  price: "₹8L - ₹12L",
  year: "2023",
  km: "0",
  owners: "New",
  mileage: "18 km/l",
  fuel: "Petrol / Diesel",
  rating: 4.3,
  images: ["/cars/trax.jpg", "/cars/trax2.jpg", "/cars/trax3.jpg","/cars/trax4.jpg"],
  variants: [
    { name: "LS", price: "₹8L", features: ["Manual"] },
    { name: "LT", price: "₹12L", features: ["Touchscreen"] }
  ],
  reviews: [{ user: "Pooja", rating: 5, text: "Compact SUV with good performance and features!" }]
},
Traveller: { 
  name:"Force Traveller",
  price: "₹10L - ₹20L",
  year: "2023",
  km: "0",
  owners: "New",
  mileage: "10 km/l",
  fuel: "Diesel",
  rating: 4.5,
  images: ["/cars/traveller.jpg", "/cars/traveller2.jpg", "/cars/traveller3.jpg","/cars/traveller4.jpg"],
  variants: [
    { name: "Standard", price: "₹10L", features: ["Manual"] },
    { name: "Premium", price: "₹20L", features: ["Touchscreen"] }
  ],
  reviews: [{ user: "Suresh", rating: 5, text: "Spacious and reliable van for group travel!" }] 
},
Cayenne: {
  name: "Porsche Cayenne",
  price: "₹1Cr+",
  year: "2023",
  km: "0",
  owners: "New",
  mileage: "12 km/l",
  fuel: "Petrol / Diesel",
  rating: 4.8,
  images: ["/cars/cayenne.jpg"],
  variants: [
    { name: "Standard", price: "₹1Cr+", features: ["Luxury Interior", "Advanced Performance"] }
  ],
  reviews: [{ user: "Manoj", rating: 5, text: "Luxurious and powerful SUV with great performance!" }] 
},
Macan: {
  name: "Porsche Macan",
  price: "₹70L+",
  year: "2023",
  km: "0",
  owners: "New",
  mileage: "14 km/l",
  fuel: "Petrol / Diesel",
  rating: 4.7,
  images: ["/cars/macan.jpg"],
  variants: [
    { name: "Standard", price: "₹70L+", features: ["Luxury Interior", "Sporty Performance"] }
  ],
  reviews: [{ user: "Nikhil", rating: 5, text: "Compact luxury SUV with sporty performance and great features!" }]
},
Panamera: {
  name: "Porsche Panamera",
  price: "₹1.5Cr+",
  year: "2023",
  km: "0",
  owners: "New",
  mileage: "10 km/l",
  fuel: "Petrol / Diesel",
  rating: 4.9,
  images: ["/cars/panamera.jpg"],
  variants: [
    { name: "Standard", price: "₹1.5Cr+", features: ["Luxury Interior", "High Performance"] }
  ],
  reviews: [{ user: "Arjun", rating: 5, text: "Luxurious and powerful sports sedan with stunning design!" }]
},
Portofino:{
  name: "Ferrari Portofino",
  price: "₹3Cr+",
  year: "2023",
  km: "0",
  owners: "New",
  mileage: "8 km/l",
  fuel: "Petrol",
  rating: 4.9,
  images: ["/cars/portofino.jpg"],
  variants: [
    { name: "Standard", price: "₹3Cr+", features: ["V8 Engine", "Convertible"] }
  ],
  reviews: [{ user: "Arjun", rating: 5, text: "Stunning convertible with great performance and Italian flair!" }]
},
Roma: {
  name: "Ferrari Roma",
  price: "₹3Cr+",
  year: "2023",
  km: "0",
  owners: "New",
  mileage: "8 km/l",
  fuel: "Petrol",
  rating: 4.9,
  images: ["/cars/roma.jpg"],
  variants: [
    { name: "Standard", price: "₹3Cr+", features: ["V8 Engine", "Sleek Design"] }
  ],
  reviews: [{ user: "Arjun", rating: 5, text: "Elegant and powerful sports car with stunning design!" }]
},
Aventador: {
  name: "Lamborghini Aventador",
  price: "₹3Cr+",
  year: "2023",
  km: "0",
  owners: "New",
  mileage: "6 km/l",
  fuel: "Petrol",
  rating: 4.9,
  images: ["/cars/aventador.jpg"],
  variants: [
    { name: "Standard", price: "₹3Cr+", features: ["V12 Engine", "All-Wheel Drive"] }
  ],
  reviews: [{ user: "Arjun", rating: 5, text: "Exotic supercar with breathtaking performance and aggressive styling!" }]
},
Urus: {
  name: "Lamborghini Urus",
  price: "₹3Cr+",
  year: "2023",
  km: "0",
  owners: "New",
  mileage: "8 km/l",
  fuel: "Petrol",
  rating: 4.9,
  images: ["/cars/urus.jpg"],
  variants: [
    { name: "Standard", price: "₹3Cr+", features: ["V8 Engine", "All-Wheel Drive"] }
  ],
  reviews: [{ user: "Arjun", rating: 5, text: "Powerful and luxurious SUV with stunning design and great performance!" }]
},
Gallardo: {
  name: "Lamborghini Gallardo",
  price: "₹2Cr+",
  year: "2023",
  km: "0",
  owners: "New",
  mileage: "8 km/l",
  fuel: "Petrol",
  rating: 4.9,
  images: ["/cars/gallardo.jpg"],
  variants: [
    { name: "Standard", price: "₹2Cr+", features: ["V10 Engine", "All-Wheel Drive"] }
  ],
  reviews: [{ user: "Arjun", rating: 5, text: "Iconic supercar with great performance and timeless design!" }]
},
XE:{
  name: "Jaguar XE",
  price: "₹40L+",
  year: "2023",
  km: "0",
  owners: "New",
  mileage: "15 km/l",
  fuel: "Petrol / Diesel",
  rating: 4.6,
  images: ["/cars/xe.jpg"],
  variants: [
    { name: "Standard", price: "₹40L+", features: ["Luxury Interior", "Advanced Safety"] }
  ],
  reviews: [{ user: "Manoj", rating: 5, text: "Stylish and luxurious sedan with great performance!" }]
},
XF: {
  name: "Jaguar XF",
  price: "₹50L+",
  year: "2023",
  km: "0",
  owners: "New",
  mileage: "14 km/l",
  fuel: "Petrol / Diesel",
  rating: 4.7,
  images: ["/cars/xf.jpg"],
  variants: [
    { name: "Standard", price: "₹50L+", features: ["Luxury Interior", "Advanced Performance"] }
  ],
  reviews: [{ user: "Manoj", rating: 5, text: "Elegant and powerful sedan with stunning design!" }]
},
XJ: {
  name: "Jaguar XJ",
  price: "₹1Cr+",
  year: "2023",
  km: "0",
  owners: "New",
  mileage: "12 km/l",
  fuel: "Petrol / Diesel",
  rating: 4.8,
  images: ["/cars/xj.jpg"],
  variants: [
    { name: "Standard", price: "₹1Cr+", features: ["Luxury Interior", "Advanced Technology"] }
  ],
  reviews: [{ user: "Manoj", rating: 5, text: "Luxurious and spacious sedan with great performance and features!" }]
},
Levante: {
  name: "Maserati Levante",
  price: "₹1Cr+",
  year: "2023",
  km: "0",
  owners: "New",
  mileage: "10 km/l",
  fuel: "Petrol / Diesel",
  rating: 4.7,
  images: ["/cars/levante.jpg"],
  variants: [
    { name: "Standard", price: "₹1Cr+", features: ["Luxury Interior", "Sporty Performance"] }
  ],
  reviews: [{ user: "Nikhil", rating: 5, text: "Luxurious and sporty SUV with great performance and Italian flair!" }]
},
Quattroporte: {
  name: "Maserati Quattroporte",
  price: "₹1.5Cr+",
  year: "2023",
  km: "0",
  owners: "New",
  mileage: "8 km/l",
  fuel: "Petrol / Diesel",
  rating: 4.8,
  images: ["/cars/quattroporte.jpg"],
  variants: [
    { name: "Standard", price: "₹1.5Cr+", features: ["Luxury Interior", "High Performance"] }
  ],
  reviews: [{ user: "Arjun", rating: 5, text: "Elegant and powerful sports sedan with stunning design and Italian flair!" }]
},
Countryman: {
  name: "Mini Countryman",
  price: "₹30L+",
  year: "2023",
  km: "0",
  owners: "New",
  mileage: "15 km/l",
  fuel: "Petrol / Diesel",
  rating: 4.6,
  images: ["/cars/countryman.jpg"],
  variants: [
    { name: "Standard", price: "₹30L+", features: ["Turbocharged Engine", "All-Wheel Drive"] }
  ],
  reviews: [{ user: "Vikram", rating: 5, text: "Stylish and versatile compact SUV with great performance!" }]
},
Clubman: {
  name: "Mini Clubman",
  price: "₹30L+",
  year: "2023",
  km: "0",
  owners: "New",
  mileage: "16 km/l",
  fuel: "Petrol / Diesel",
  rating: 4.7,
  images: ["/cars/clubman.jpg"],
  variants: [
    { name: "Standard", price: "₹30L+", features: ["Turbocharged Engine", "Unique Design"] }
  ],
  reviews: [{ user: "Vikram", rating: 5, text: "Quirky and stylish compact car with great performance and unique design!" }]
},
Cullinan: {
  name: "Rolls-Royce Cullinan",
  price: "₹5Cr+",
  year: "2023",
  km: "0",
  owners: "New",
  mileage: "10 km/l",
  fuel: "Petrol",
  rating: 4.9,
  images: ["/cars/cullinan.jpg"],
  variants: [
    { name: "Standard", price: "₹5Cr+", features: ["V12 Engine", "All-Wheel Drive"] }
  ],
  reviews: [{ user: "Arjun", rating: 5, text: "Ultimate luxury SUV with unmatched comfort and performance!" }]
},
Dawn: {
  name: "Rolls-Royce Dawn",
  price: "₹3Cr+",
  year: "2023",
  km: "0",
  owners: "New",
  mileage: "8 km/l",
  fuel: "Petrol",
  rating: 4.9,
  images: ["/cars/dawn.jpg"],
  variants: [
    { name: "Standard", price: "₹3Cr+", features: ["V12 Engine", "Convertible"] }
  ],
  reviews: [{ user: "Arjun", rating: 5, text: "Luxurious convertible with stunning design and great performance!" }]
},
Wraith: {
  name: "Rolls-Royce Wraith",
  price: "₹3Cr+",
  year: "2023",
  km: "0",
  owners: "New",
  mileage: "8 km/l",
  fuel: "Petrol",
  rating: 4.9,
  images: ["/cars/wraith.jpg"],
  variants: [
    { name: "Standard", price: "₹3Cr+", features: ["V12 Engine", "Coupe Design"] }
  ],
  reviews: [{ user: "Arjun", rating: 5, text: "Luxurious and powerful coupe with stunning design and great performance!" }]
},
Vento: {
  name: "Volkswagen Vento",
  price: "₹10L - ₹15L",
  year: "2023",
  km: "0",
  owners: "New",
  mileage: "18 km/l",
  fuel: "Petrol / Diesel",
  rating: 4.5,
  images: ["/cars/vento.jpg", "/cars/vento2.jpg", "/cars/vento3.jpg","/cars/vento4.jpg"],
  variants: [
    { name: "Trendline", price: "₹10L", features: ["Manual"] },
    { name: "Highline", price: "₹15L", features: ["Touchscreen"] }
  ],
  reviews: [{ user: "Rohit", rating: 5, text: "Comfortable and efficient sedan with good features!" }]
},
Safari:{
  name: "Tata Safari",
  price: "₹15L - ₹20L",
  year: "2023",
  km: "0",
  owners: "New",
  mileage: "16 km/l",
  fuel: "Petrol / Diesel",
  rating: 4.5,
  images: ["/cars/safari.jpg", "/cars/safari2.jpg", "/cars/safari3.jpg","/cars/safari4.jpg"],
  variants: [
    { name: "XE", price: "₹15L", features: ["Manual"] },
    { name: "XM", price: "₹20L", features: ["Touchscreen"] }
  ],
  reviews: [{ user: "Suresh", rating: 5, text: "Spacious and feature-rich SUV with great value for money!" }]
},

Bentayga: {
  name: "Bentley Bentayga",
  price: "₹ 5.48 - 5.6 Crore",
  year: "2015",
  km: "0",
  owners: "New",
  mileage: "6 km/l",
  fuel: "Petrol / Diesel",
  rating: 4.8,
  images: ["/cars/bentayga.jpg"],
  variants: [
    { name: "V8", price: "₹5.48 Crore", features: ["V8 Engine", "All-Wheel Drive"] },
    { name: "W12", price: "₹5.6 Crore", features: ["W12 Engine", "All-Wheel Drive"] }
  ],
  reviews: [{ user: "Arjun", rating: 5, text: "Luxurious and powerful SUV with stunning design and great performance!" }]
},
"Flying Spur": {
  name: "Bentley Flying Spur",
  price: "₹ 4.5 - 5 Crore",
  year: "2023",
  km: "0",
  owners: "New",
  mileage: "8 km/l",
  fuel: "Petrol",
  rating: 4.9,
  images: ["/cars/flyingspur.jpg"],
  variants: [
    { name: "V8", price: "₹4.5 Crore", features: ["V8 Engine", "All-Wheel Drive"] }
  ],
  reviews: [{ user: "Arjun", rating: 5, text: "Luxurious and elegant sedan with stunning design and great performance!" }]
},
Sierra: {
  name: "Tata Sierra",
  price: "₹11.49 - 21.29 Lakh*",
  year: "2026",
  km: "0",
  owners: "New",
  mileage: "12 km/l",
  fuel: "Petrol / Diesel",
  rating: 4.6,
  images: ["/cars/sierra.jpg"],
  variants: [
    { name: "Standard", price: "₹40L+", features: ["Powerful Engine", "All-Wheel Drive"] }
  ],
  reviews: [{ user: "Vikram", rating: 5, text: "Rugged and capable pickup truck with great performance!" }]
},
"Sierra EV": {
  name: "Tata Sierra EV",
  price: "₹20L - ₹25L",
  year: "2026",
  km: "0",
  owners: "New",
  mileage: "15 km/l",
  fuel: "Electric",
  rating: 4.7,
  images: ["/cars/sierra-ev.jpg"],
  variants: [
    { name: "Standard", price: "₹20L+", features: ["Electric Motor", "All-Wheel Drive"] }
  ],
  reviews: [{ user: "Vikram", rating: 5, text: "Eco-friendly and powerful electric pickup truck with great performance!" }]
},
Kwid: {
  name: "Renault Kwid",
  price: "₹4L - ₹6L",
  year: "2025",
  km: "0",
  owners: "New",
  mileage: "20 km/l",
  fuel: "Petrol",
  rating: 4.4,
  images: ["/cars/kwid.jpg", "/cars/kwid2.jpg", "/cars/kwid3.jpg","/cars/kwid4.jpg"],
  variants: [
    { name: "Standard", price: "₹4L", features: ["Manual"] },
    { name: "Premium", price: "₹6L", features: ["Touchscreen"] }
  ],
  reviews: [{ user: "Pooja", rating: 5, text: "Affordable and efficient compact car with good features!" }]
},
Triber:{
  name: "Renault Triber",
  price: "₹5.76L - ₹8.60L",
  year: "2025",
  km: "0",
  owners: "New",
  mileage: "18 km/l",
  fuel: "Petrol,CNG",
  rating: 4.3,
  images: ["/cars/triber.jpg", "/cars/triber2.jpg", "/cars/triber3.jpg","/cars/triber4.jpg"],
  variants: [
    { name: "Standard", price: "₹5.76L", features: ["Manual"] },
    { name: "Premium", price: "₹8.60L", features: ["Touchscreen"] }
  ],
  reviews: [{ user: "Pooja", rating: 5, text: "Affordable and spacious compact MPV with good features!" }]
}
};

export default function CarDetails() {

  const { id } = useParams();
  const car = cars[decodeURIComponent(id)];

  const [showBooking, setShowBooking] = useState(false);
  const [tab, setTab] = useState("overview");
  const [currentIndex, setCurrentIndex] = useState(0);

useEffect(() => {
  const interval = setInterval(() => {
    setCurrentIndex((prev) =>
      prev === car.images.length - 1 ? 0 : prev + 1
    );
  }, 10000);

  return () => clearInterval(interval);
}, [car.images.length]);

const nextSlide = () => {
  setCurrentIndex((prev) =>
    prev === car.images.length - 1 ? 0 : prev + 1
  );
};

const prevSlide = () => {
  setCurrentIndex((prev) =>
    prev === 0 ? car.images.length - 1 : prev - 1
  );
};

  if (!car) return <h2 style={{ padding: 40 }}>Car not found</h2>;

  return (
    <div className="car-details-page">

      {/* ================= HERO SECTION ================= */}
      <div className="car-hero">

        {/* LEFT CONTENT */}
        <div className="hero-left">
          <Link to="/new-cars" className="back-btn">← Back</Link>

          <h1>{car.name}</h1>
          <div className="rating">⭐ {car.rating}/5</div>

          <div className="price-premium">
            <span className="price-label">Starting From</span>
            <span className="price-value">₹ {car.price}</span>
          </div>

          <div className="hero-buttons">
            <button className="btn-primary glow">
              Get Best Offer
            </button>

            <button
              className="btn-outline"
              onClick={() => setShowBooking(true)}
            >
              🚗 Book Test Drive
            </button>
          </div>

          <div className="quick-info">
            <span>📅 {car.year}</span>
            <span>⛽ {car.fuel}</span>
            <span>🚘 {car.km} km</span>
            <span>👤 {car.owners}</span>
          </div>
        </div>

        {/* RIGHT IMAGE */}
     <div className="hero-right">
  <div className="carousel-container">

    <button className="arrow left" onClick={prevSlide}>
      ❮
    </button>

    <img
      src={car.images[currentIndex]}
      alt={car.name}
      className="hero-car-img"
    />

    <button className="arrow right" onClick={nextSlide}>
      ❯
    </button>

  </div>
</div>


      </div>

      {/* ================= THUMBNAILS ================= */}
     <div className="thumbnail-row">
  {car.images.map((img, index) => (
    <img
      key={index}
      src={img}
      className={currentIndex === index ? "thumb active" : "thumb"}
      onClick={() => setCurrentIndex(index)}
    />
  ))}
</div>


      {/* ================= TECH STATS ================= */}
      <div className="tech-stats">
        <div className="stat-card">
          <span>⚡ Power</span>
          <h3>120 HP</h3>
        </div>

        <div className="stat-card">
          <span>🚀 0-100</span>
          <h3>9.8s</h3>
        </div>

        <div className="stat-card">
          <span>⛽ Mileage</span>
          <h3>{car.mileage}</h3>
        </div>

        <div className="stat-card">
          <span>🛡 Safety</span>
          <h3>5 Star</h3>
        </div>
      </div>

      {/* ================= TABS ================= */}
      <div className="cw-tabs">
        {["overview", "variants", "mileage", "reviews"].map((t) => (
          <span
            key={t}
            onClick={() => setTab(t)}
            className={tab === t ? "active" : ""}
          >
            {t.toUpperCase()}
          </span>
        ))}
      </div>

      {/* ================= OVERVIEW ================= */}
      {tab === "overview" && (
        <div className="overview-grid">
          <div className="spec-card">
            <h4>Model</h4>
            <p>{car.name}</p>
          </div>

          <div className="spec-card">
            <h4>Fuel Type</h4>
            <p>{car.fuel}</p>
          </div>

          <div className="spec-card">
            <h4>Mileage</h4>
            <p>{car.mileage}</p>
          </div>

          <div className="spec-card">
            <h4>Transmission</h4>
            <p>Automatic</p>
          </div>
        </div>
      )}

      {/* ================= VARIANTS ================= */}
      {tab === "variants" && (
        <div className="variant-box">
          {car.variants.map((v, i) => (
            <div key={i} className="variant-card">
              <h3>{v.name}</h3>
              <p>{v.price}</p>
              <ul>
                {v.features.map((f, idx) => (
                  <li key={idx}>✔ {f}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {/* ================= MILEAGE ================= */}
      {tab === "mileage" && (
        <div className="mileage-modern">
          <h2>Mileage Performance</h2>

          <div className="mileage-bar">
            <span>City</span>
            <div className="bar"><div style={{ width: "60%" }}></div></div>
            <p>15 km/l</p>
          </div>

          <div className="mileage-bar">
            <span>Highway</span>
            <div className="bar"><div style={{ width: "80%" }}></div></div>
            <p>19 km/l</p>
          </div>

          <div className="mileage-bar">
            <span>Combined</span>
            <div className="bar"><div style={{ width: "70%" }}></div></div>
            <p>{car.mileage}</p>
          </div>
        </div>
      )}

      {/* ================= REVIEWS ================= */}
      {tab === "reviews" && (
        <div className="reviews">
          {car.reviews.map((r, i) => (
            <div key={i} className="review-card">
              ⭐ {r.rating}/5
              <br />
              <b>{r.user}</b>
              <p>{r.text}</p>
            </div>
          ))}
        </div>
      )}

      {showBooking && (
        <BookingModal
          car={car}
          onClose={() => setShowBooking(false)}
        />
      )}

    </div>
  );
}