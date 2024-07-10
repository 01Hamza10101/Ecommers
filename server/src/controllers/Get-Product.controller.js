import mongoose from "mongoose";
import { Product } from "../models/product.model.js";
import GetImageUrl from "./img-download.controller.js";

async function GetProduct(req, res) {
    try {
        let response;
        // console.log(req.body);
        if(Object.keys(req.body).length > 0){
            response = await Product.find({ Title: { $regex: new RegExp(req.body.word, 'i') } });
            console.log("search result")
        }else{
            response = await Product.find().limit(5);
            console.log("Get")
        };
        
        // console.log(response);
        const productdata = await Promise.all(response.map(async (data) => {
            const Image1 = await GetImageUrl(data.Image1);
            const Image2 = await GetImageUrl(data.Image2);
            const Image3 = await GetImageUrl(data.Image3);
            const Image4 = await GetImageUrl(data.Image4);
            return {
                ...data.toObject(), 
                Image1,
                Image2,
                Image3,
                Image4
            };
        }));

        res.json(productdata); // Send modified product data as response
        // console.log(productdata); // Log the modified product data
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
}

export default GetProduct;
