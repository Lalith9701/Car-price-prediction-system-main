import mongoose from "mongoose";

const CarSchema = new mongoose.Schema({
  brand:String,
  model:String,
  year:Number,
  km:Number,
  price:Number,
  images:[String],
  createdAt:{
    type:Date,
    default:Date.now
  }
});

const Car = mongoose.model("Car",CarSchema);

export default Car;