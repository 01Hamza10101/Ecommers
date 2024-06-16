import mongoose from "mongoose";

const AddressSchema = new mongoose.Schema({
    Name:{
        type:String,
        required:true
    },
    MobileNumber:{
        type:String,
        required:true
    },
    PinCode:{
        type:String,
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
        type:String
    }
});
  
const Address = mongoose.model('Address', AddressSchema);
  
export {Address};