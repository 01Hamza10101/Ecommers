import mongoose from "mongoose";
import { Product } from "../models/product.model.js";


async function AddProduct(){
    const AddProduct = new Product({
    UserId:"6674fd9ae2b0000fa4e43e62",
    Image1:"1234566JJN",
    Image2:"1234455NMJ",
    Image3:"1234566MNK",
    Image4:"12345556MJ",
    Image5:"12345MKNKO",
    Image6:"12345LKNKI",
    Title:"Chocolate Peanut Butter: Smooth",
    OldPrice:1233,
    CurrentPrice:123,
    Pincode:["812009","12387"],
    Quantity:19,
    Highlight:["Antioxidants","Vitamin & Minerals"],
    description: "Get ready for a delicious snack with our combo pack! MyFitness Chocolate & Olympia Peanut Butter is the perfect way to fuel your body with the power of protein and indulge in a delicious taste. Made with the finest ingredients, the Olympia spread is packed with added whey protein to support your fitness goal. And if you're looking to curb your chocolate cravings, then the Chocolate variant is just what you need. It's a delicious blend of unsweetened Belgian chocolate and 100% roasted peanuts, making it the perfect protein snack. So why wait? Indulge in the perfect balance of taste and nutrition by trying our Chocolate Smooth and Olympia Smooth Duo Pack today!",
    SupplierDescription:"Get ready for a delicious snack with our combo pack! MyFitness Chocolate & Olympia Peanut Butter is the perfect way to fuel your body with the power of protein and indulge in a delicious taste. Made with the finest ingredients, the Olympia spread is packed with added whey protein to support your fitness goal. And if you're looking to curb your chocolate cravings, then the Chocolate variant is just what you need. It's a delicious blend of unsweetened Belgian chocolate and 100% roasted peanuts, making it the perfect protein snack. So why wait? Indulge in the perfect balance of taste and nutrition by trying our Chocolate Smooth and Olympia Smooth Duo Pack today!"
    })
    AddProduct.save();
    console.log(AddProduct);
}

export default AddProduct;