import mongoose from "mongoose";

const AddressSchema = new mongoose.Schema({
    UserId:{
        type:String,
        unique:true,
        required:true
    },
    Name:{
        type:String,
        required:true
    },
    MobileNumber:{
        type:Number,
        required:true
    },
    PinCode:{
        type:Number,
        required:true
    },
    Locality:{
        type:String,
        required:true
    },
    Address:{
        type:String,
        required:true
    },
    City:{
        type:String,
        required:true
    },
    State:{
        type:String,
        required:true
    },
    Landmark:{
        type:String
    },
    MobileNumberOpt:{
        type:Number
    }
});
  
const Address = mongoose.model('Address', AddressSchema);
  
export {Address};