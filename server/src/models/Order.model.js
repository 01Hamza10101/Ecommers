import mongoose from "mongoose";
import { type } from "os";

const OrderSchema = new mongoose.Schema({
    UserEmail:{
        type:String,
        required:true
    },
    ProductIds:[{
        ProductId:{
            type:String,
            required:true
        },
        Pack:{
            type:Number,
            required:true
        },
        _id:{
            type:String,
            required:true
        }
    }],
    Status:[{
        status:String,
        Date:String,
        message:String,
        // enum: ['Pending','Order Confirmed', 'In Progress', 'Out for Delivery', 'Delivered', 'Cancelled'],
        // default: 'Pending'
    }],
    Note:[{
        message:{
        type:String,
        required:true
        }
    }],
    CustomerIP:{
        type:String,
        required:true
    },
    OrderNumber:{
        type:Number,
        required:true
    },
    PaymentVia:{
        type:String,
        required:true
     },
     Phone:{
        type:String,
        required:true
     }
});
  
const Order = mongoose.model('Order', OrderSchema);

  

export default Order;