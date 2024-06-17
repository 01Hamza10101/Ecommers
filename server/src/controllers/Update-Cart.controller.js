import mongoose from "mongoose";
import { User } from "../models/user.model.js";

async function UpdateCart(){
   const user = await User.findOneAndUpdate({
        EmailAddress:"johndoe@example.com"
    },{
        $push:{
            ProductCart:{
                ProductId:"HFDII234DN4483NV",
                Pack:8
            }
        }
    })
    // const data = await User.findOne({
    //     EmailAddress:"johndoe@example.com"
    // })
    // console.log(data)
    console.log(user)
}

export default UpdateCart;