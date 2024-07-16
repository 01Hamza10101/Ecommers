import mongoose from "mongoose";
import { Product } from "../models/product.model.js";
import GetImageUrl from "./img-download.controller.js";

async function findProductsByIds(ids) {
    try {
        let objectIds = [];
        ids.map(id => {
            objectIds.push(id.ProductId);
        } );
        // const objectIds = ids.map(id => mongoose.Types.ObjectId(id));
        const products = await Product.find({ _id: { $in: objectIds } });

        return products;
    } catch (error) {
        console.error('Error finding products by IDs:', error);
        throw error; 
    }
}

async function GetCartProduct(req, res) {
    try {
        let response = await findProductsByIds(req.user.ProductCart);
        // let response = await findProductsByIds(req.user.ProductCart);
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

        res.status(200).json(productdata);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
}

export default GetCartProduct;
