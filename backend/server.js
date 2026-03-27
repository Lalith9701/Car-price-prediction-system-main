import express from "express";
import cors from "cors";
import multer from "multer";
import fs from "fs";
import axios from "axios";

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
let OTP_STORE = {};

const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(DATA_FILE)) fs.writeFileSync(DATA_FILE, "[]");
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

/* =====================================================
   CAR ROUTES (JSON STORAGE)
===================================================== */

app.get("/", (req,res)=>{
  res.send("Backend Running");
});

app.get("/cars", (req,res)=>{
  res.json(readCars());
});

app.post("/cars", upload.array("images",10), (req,res)=>{

  const images = req.files.map(f=>"uploads/"+f.filename);

  const car = {
    id: Date.now(),
    name: req.body.name,
    year: req.body.year,
    km: req.body.km,
    owners: req.body.owners,
    price: req.body.price,
    images
  };

  const cars = readCars();
  cars.push(car);
  saveCars(cars);

  res.json({ success:true, car });
});

app.delete("/cars/:id",(req,res)=>{
  const cars = readCars().filter(c=>c.id!=req.params.id);
  saveCars(cars);
  res.json({ success:true });
});

/* =====================================================
   OTP ROUTES
===================================================== */

app.post("/send-otp", async (req,res)=>{
  const { phone } = req.body;

  const otp = Math.floor(100000 + Math.random()*900000);
  OTP_STORE[phone] = otp;

  try {
    await axios.post(
      "https://www.fast2sms.com/dev/bulkV2",
      {
        route: "otp",
        variables_values: otp,
        numbers: phone
      },
      {
        headers: {
          authorization: "YOUR_FAST2SMS_API_KEY",
          "Content-Type": "application/json"
        }
      }
    );

    console.log("OTP sent:", otp);
    res.json({ success:true });

  } catch(err){
    console.log("OTP ERROR:", err.response?.data || err.message);
    res.json({ success:false });
  }
});

app.post("/verify-otp",(req,res)=>{
  const { phone, otp } = req.body;

  if(OTP_STORE[phone] == otp){
    delete OTP_STORE[phone];
    return res.json({ success:true });
  }

  res.json({ success:false });
});

/* ===========================
   SERVER START
=========================== */

app.listen(5050,()=>{
  console.log("🚀 Backend running at http://localhost:5050");
});