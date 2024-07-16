import Order from "../models/Order.model.js";
import DeleteCart from "./Delete-Cart.controller.js";
import {Product} from '../models/product.model.js';
import GetImageUrl from '../controllers/img-download.controller.js';
import instance from '../middlewares/Razorpay.js';
import PaymentGateway from '../utils/Phone-Pay.js';

async function PlaceOrder(req, res) {

    //   let options = {
    //     amount: 50000,
    //     currency: "INR",
    //     receipt: `order_rcptid_11898`,
    //   };
    //   instance.orders.create({
    //       "amount": 50000,
    //       "currency": "INR",
    //       "receipt": "receipt#1",
    //       "partial_payment": false,
    //       "notes": {
    //         "key1": "value3",
    //         "key2": "value2"
    //       }
    //     }).then((order) => {
    //       console.log('Order created successfully:', order);
    //   })
    //   .catch((err) => {
    //       console.error('Error creating order:', err);
    //       console.log('Complete error object:', err);
    //   });
      
      
      try {
        // PaymentGateway();
        let OrderRes = new Order({
            UserEmail: req.user.EmailAdress || "mdhanzla30@gmail.com",
            ProductIds: req.user.ProductCart,
            TotalAmount:req.body.data.TotalAmount,
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
                        }
                    }))
        OrderRes.save().then(() => {
            res.status(200).json({ msg: "Order Placed", OrderRes });
        });
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
                return {
                    OrderCard:order._id,
                    ProductId:productIdObj.ProductId,
                    Title: product.Title,
                    CurrentPrice: product.CurrentPrice,
                    Highlight: product.Highlight,
                    Image1: imgurl,
                    Note:order.Note,
                    Status:order.Status
                };
            }));
            return products;
        }));
        // let OrderCard = orders.map((data)=>{
        //     return data._id
        // })
        res.status(200).json(ordrobj);
       
    } catch (error) {
        res.status(400).json({msg:"Order not found!"});
    }
};