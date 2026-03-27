import express from "express";
import Car from "../models/Car.js";
import upload from "../middleware/upload.js";

const router = express.Router();


/* ⭐ GET ALL CARS */
router.get("/", async (req, res) => {
  try {
    const cars = await Car.find().sort({ createdAt: -1 });
    res.json(cars);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});


/* ⭐ ADD CAR WITH IMAGES */
router.post("/add", upload.array("images"), async (req, res) => {
  try {

    const body = JSON.parse(req.body.data);

    /* save image filenames */
    body.images = req.files.map(f => f.filename);

    const car = await Car.create(body);

    res.json(car);

  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

export default Car;