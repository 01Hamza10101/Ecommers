import mongoose from "mongoose";

const ImageSchema = new mongoose.Schema({
    title: String,
    description: String,
    imageId: String,
  });
  
const Image = mongoose.model('Image', ImageSchema);
  
export {Image};