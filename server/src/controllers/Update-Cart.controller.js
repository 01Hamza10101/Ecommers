import mongoose from "mongoose";
import { User } from "../models/user.model.js";

async function UpdateCart(req,res){
    try{
        const productInCart = req.user.ProductCart.some(data => data.ProductId === req.body.Productid);
        if (productInCart) {
            return res.status(200).json({ msg: 'Product already in cart' });
        }
        const user = await User.findOneAndUpdate({
             EmailAddress:req.user.EmailAddress
         },{
            $push:{
                 ProductCart:{
                     ProductId:req.body.Productid,
                     Pack:req.body.Pack,
                 }
             }
         });

         if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }
         
         res.status(200).json({msg:'Cart updated successfully'});
    }catch(error){
        res.status(400).json({msg:'Update cart server error',error})
    }
    // const data = await User.findOne({
    //     EmailAddress:"johndoe@example.com"
    // })
}

export default UpdateCart;