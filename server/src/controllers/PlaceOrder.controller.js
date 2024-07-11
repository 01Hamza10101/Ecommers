import { Types } from "mongoose";
import Order from "../models/Order.model.js";
import DeleteCart from "./Delete-Cart.controller.js";
import {Product} from '../models/product.model.js';
import GetImageUrl from '../controllers/img-download.controller.js';

async function PlaceOrder(req, res) {
    try {
        let OrderRes = new Order({
            UserEmail: req.user.EmailAdress || "mdhanzla30@gmail.com",
            ProductIds: req.user.ProductCart,
            Status: {
                status:"Pending",
                Date:"Wednusday",
                message:"Your order is put on hold"
            },
            Note: [{
                message: 'started'
            }],
            CustomerIP: req.ip,
            OrderNumber: Date.now(),
            PaymentVia: req.body.data.PaymentVia,
            Phone: req.body.data.Phone 
        });
        await Promise.all(req.user.ProductCart.map(async(data)=>{
                        try {
                            await DeleteCart({
                                Type: "OrderRes",
                                user: {
                                    EmailAddress: req.user.EmailAddress
                                },
                                body: {
                                    id: data.ProductId
                                }
                            });
                        } catch (error) {
                            console.error(`Error deleting cart item ${data.ProductId}:`, error);
                        }
                    }))
        OrderRes.save().then(() => {
            res.status(200).json({ msg: "Order Placed", OrderRes });
        });
        console.log(req.user.ProductCart);
    } catch (error) {
        res.status(400).json({ msg: "Order Place failed!", error });
    }
};

export default PlaceOrder;

export async function GetOrder(req,res){
    try {
        let orders = await Order.find({UserEmail:req.user.EmailAddress});

        let ordrobj = await Promise.all(orders.map(async order => {
            let products = await Promise.all(order.ProductIds.map(async productIdObj => {
                let product = await Product.findById(productIdObj.ProductId);
                let imgurl = await GetImageUrl(product.Image1);
                // console.log(imgurl);
                return {
                    Title: product.Title,
                    CurrentPrice: product.CurrentPrice,
                    Highlight: product.Highlight,
                    Image1: imgurl,
                    Note:order.Note,
                    Status:order.Status
                };
            }));
            console.log(products);
            return products;
        }));
        res.status(200).json(ordrobj);
       
    } catch (error) {
        console.log(error);
        res.status(400).json({msg:"Order not found!"});
    }
    console.log(req.user);
};