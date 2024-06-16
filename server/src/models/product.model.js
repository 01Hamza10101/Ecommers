import mongoose from "mongoose";

const ProuductSchema = new mongoose.Schema({
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
        type:String,
        required:true
    },
    CurrentPrice:{
        type:String,
        required:true
    },
    Pincode:{
        type:Array,
        required:true
    },
    Quantity:{
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