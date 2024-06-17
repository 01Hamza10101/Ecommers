import mongoose from "mongoose";
import { User } from "../models/user.model.js";

async function DeleteCart(){
    const user = await User.findOneAndUpdate({
        EmailAddress:"johndoe@example.com"
    },{
        $pull:{
            ProductCart:{
                ProductId:"HFDIIDN4483NV"
            }
        }
    })
    console.log(user)
}

export default DeleteCart;