import express from "express";
import cors from "cors";
import multer from "multer";
import fs from "fs";
import axios from "axios";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import carRoutes from "./routes/carRoutes.js";

/* ===========================
   APP INIT
=========================== */

const app = express();

/* ===========================
   CORS + JSON
=========================== */

app.use(cors({
  origin: function (origin, callback) {
    callback(null, true)
  },
  methods: ["GET","POST","DELETE"],
  credentials: true
}));

app.use(express.json());

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* serve images */
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

/* external routes */
app.use("/api/cars", carRoutes);

/* ===========================
   FILE SETUP
=========================== */

const DATA_FILE = path.join(__dirname, "cars.json");
const USERS_FILE = path.join(__dirname, "users.json");

const JWT_SECRET = "super_secret_jwt_key_hubcars";

const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(DATA_FILE)) fs.writeFileSync(DATA_FILE, "[]");
if (!fs.existsSync(USERS_FILE)) fs.writeFileSync(USERS_FILE, "[]");
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir);

/* ===========================
   MULTER IMAGE UPLOAD
=========================== */

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + "-" + file.originalname)
});

const upload = multer({ storage });

/* ===========================
   HELPERS
=========================== */

const readCars = () =>
  JSON.parse(fs.readFileSync(DATA_FILE));

const saveCars = cars =>
  fs.writeFileSync(DATA_FILE, JSON.stringify(cars, null, 2));

const readUsers = () =>
  JSON.parse(fs.readFileSync(USERS_FILE));

const saveUsers = users =>
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));

/* =====================================================
   CAR ROUTES (JSON STORAGE)
===================================================== */

app.get("/", (req,res)=>{
  res.send("Backend Running");
});

app.get("/cars", (req,res)=>{
  let cars = readCars();
  
  const now = Date.now();
  
  cars = cars.filter(car => {
    const createdAt = car.createdAt || car.id; 
    const durationDays = car.listingDuration || 10;
    const DURATION_MS = durationDays * 24 * 60 * 60 * 1000;
    return (now - createdAt) <= DURATION_MS;
  });
  
  res.json(cars);
});

app.post("/cars", upload.array("images",10), (req,res)=>{

  const images = req.files.map(f=>"uploads/"+f.filename);

  const car = {
    id: Date.now(),
    createdAt: Date.now(),
    name: req.body.name,
    year: req.body.year,
    km: req.body.km,
    fuel: req.body.fuel,
    transmission: req.body.transmission,
    owners: req.body.owners,
    service: req.body.service,
    accident: req.body.accident,
    rc: req.body.rc,
    insurance: req.body.insurance,
    loan: req.body.loan,
    exterior: req.body.exterior,
    interior: req.body.interior,
    tyre: req.body.tyre,
    sellerName: req.body.sellerName,
    sellerPhone: req.body.sellerPhone,
    city: req.body.city,
    price: req.body.price,
    listingDuration: parseInt(req.body.listingDuration) || 10,
    images
  };

  const cars = readCars();
  cars.push(car);
  saveCars(cars);

  res.json({ success:true, car });
});

app.delete("/cars/:id", (req, res) => {
  const cars = readCars();
  const idToDelete = parseInt(req.params.id);
  const updatedCars = cars.filter(c => c.id !== idToDelete);
  
  if (cars.length === updatedCars.length) {
    return res.status(404).json({ success: false, message: "Car not found" });
  }

  saveCars(updatedCars);
  res.json({ success: true, message: "Car deleted successfully" });
});

/* =====================================================
   AUTH ROUTES
===================================================== */

app.post("/api/auth/register", async (req, res) => {
  try {
    const { name, phone, password, gender } = req.body;
    if (!name || !phone || !password) {
      return res.status(400).json({ success: false, message: "All fields required" });
    }

    const users = readUsers();
    if (users.find(u => u.phone === phone)) {
      return res.status(400).json({ success: false, message: "Phone number already registered" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = {
      id: Date.now().toString(),
      name,
      phone,
      password: hashedPassword,
      gender: gender || "Male"
    };

    users.push(newUser);
    saveUsers(users);

    res.status(201).json({ success: true, message: "Registration successful" });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

app.post("/api/auth/login", async (req, res) => {
  try {
    const { phone, password } = req.body;
    if (!phone || !password) {
      return res.status(400).json({ success: false, message: "Phone & password required" });
    }

    const users = readUsers();
    const user = users.find(u => u.phone === phone);
    if (!user) {
      return res.status(400).json({ success: false, message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user.id, phone: user.phone },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ 
      success: true, 
      token, 
      user: { id: user.id, name: user.name, phone: user.phone, gender: user.gender || "Male" } 
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});


/* ===========================
   SERVER START
=========================== */

app.listen(5050,()=>{
  console.log("🚀 Backend running at http://localhost:5050");
});