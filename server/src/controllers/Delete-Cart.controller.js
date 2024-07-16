import mongoose from "mongoose";
import { User } from "../models/user.model.js";

async function DeleteCart(req,res){
    try{
        
        const user = await User.findOneAndUpdate({
            EmailAddress:req.user.EmailAddress
        },{
            $pull:{
                ProductCart:{
                    ProductId:req.body.id
                }
            }
        })
        if(req.Type !== "OrderRes"){
            res.status(200).json(user);
        }
    }catch(error){
        if(req.Type !== "OrderRes"){
            res?.status(400).json({msg:"Product cart deleted",error});
        }
    }
}

export default DeleteCart;