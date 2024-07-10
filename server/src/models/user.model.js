import mongoose from "mongoose";
import { type } from "os";


const UserSchema = new mongoose.Schema({
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
        unique: true,
        required:true
    },
    Gender:{
        type:String
    },
    MobileNumber:{
        type:String,
        unique: true,
        required:true
    },
    Password:{
        type:String,
        required:true
    },
    ProfileImageId:{
        type:String, //firebase img id
        required:true
    },
    ProductCart:[
        {
            ProductId:{
                type:String,
                unique:true
            },
            Pack:{
                type:Number,
                default:1
            }
        }    
    ]
});
  
const User = mongoose.model('User', UserSchema);

const SellerUserSchema = new mongoose.Schema({
    FirstName:{
        type:String,
        required:true
    },
    LastName:{
        type:String,
        required:true
    },
    Gender:{
        type:String
    },
    EmailAddress:{
        type:String,
        unique: true,
        required:true
    },
    MobileNumber:{
        type:String,
        unique: true,
        required:true
    },
    Password:{
        type:String,
        required:true
    },
    ProfileImageId:{
        type:String, //firebase img id
        required:true
    },
    ProductCart:[
        {
            ProductId:{
                type:String
            },
            Pack:{
                type:Number,
                default:1
            }
        }    
    ]
});
  
const SellerUser = mongoose.model('SellerUser', SellerUserSchema);

export {User,SellerUser};