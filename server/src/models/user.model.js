import mongoose from "mongoose";

const ProuductSchema = new mongoose.Schema({
    FirstName:{
        type:String,
        required:true
    },
    LastName:{
        type:String,
        required:true
    },
    EmailAddress:{
        type:String,
        required:true
    },
    MobileNumber:{
        type:String,
        required:true
    }
});
  
const User = mongoose.model('User', ProuductSchema);
  
export {User};