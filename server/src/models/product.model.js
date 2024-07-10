import mongoose from "mongoose";
import { type } from "os";

const ProuductSchema = new mongoose.Schema({
    UserId:{
        type:String,
        required:true,
        unique:true
    },
    Image1:{
        type:String,
        required:true
    },
    Image2:{
        type:String,
        required:true
    },
    Image3:{
        type:String,
        required:true
    },
    Image4:{
        type:String,
        required:true
    },
    Image5:{
        type:String,
        required:true
    },
    Image6:{
        type:String,
        required:true
    },
    Title:{
        type:String,
        required:true
    },
    OldPrice:{
        type:Number,
        required:true
    },
    CurrentPrice:{
        type:Number,
        required:true
    },
    Pincode:{
        type:Array,
        required:true
    },
    Quantity:{
        type:Number,
        required:true
    },
    ProductWeight:{
        type:Array,
        required:true
    },
    Highlight:{
        type:Array,
        required:true
    },
    description: {
        type: String, 
        required: true
    },
    SupplierDescription:{
        type:String,
        required:true
    }
});
  
const Product = mongoose.model('Product', ProuductSchema);
  
export {Product};