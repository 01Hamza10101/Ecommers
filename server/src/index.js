import express from "express";
import bodyParser from "body-parser";
import logger from "morgan";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./db/index.js";

import multer from "multer";
import path from "path";
import fs from "fs";
import { admin } from "./controllers/img-upload.controller.js";
dotenv.config({
    path:'./.env'
});

import uploadImage from "./controllers/img-upload.controller.js";
import downloadImage from "./controllers/img-download.controller.js";
import SetupUser from "./utils/user-add-data.utils.js";
import deleteUser from "./utils/user-del-data.utils.js";
import updateUser from "./utils/user-update-data.utils.js";
import getdata from  "./utils/user-get-data.utils.js";

import GetProduct from "./controllers/Get-Product.controller.js";
import Register from "./controllers/Register.controller.js";
import Login from "./controllers/Login.controller.js";
import authMiddleware from "./middlewares/auth.middlewares.js";
import updateProfile from "./controllers/UpdateProfile.controller.js";
import UpdateCart from "./controllers/Update-Cart.controller.js";
import DeleteCart from "./controllers/Delete-Cart.controller.js";
import AddAddress from "./controllers/Add-Address.controller.js";
import AddProduct from "./controllers/Add-Product.controller.js";
import SellerRegister from "./controllers/SellerRegister.controller .js";
import GetCartProduct from "./controllers/GetCartData.controller.js";
import PlaceOrder from "./controllers/PlaceOrder.controller.js";
import CancelOrder from "./controllers/CancelOrder.controller.js";
import {GetOrder} from "./controllers/PlaceOrder.controller.js";
import { Address } from "../src/models/address.model.js";
import PaymentGateway from "./utils/Phone-Pay.js";
export const app = express();

app.use(cors());
// Connect to database

// Connect to MongoDB GridFS bucket using mongoose

// Middleware for parsing request body and logging requests
app.use(bodyParser.json());
app.use(logger("dev"));

// Routes for API endpoints

app.post("/Register",Register);
app.post("/Login",Login);
app.post("/UpdateProfile",authMiddleware,updateProfile);
app.post("/Getuser",authMiddleware,async(req,res)=>{
    try {
        const address = await Address.findOne({UserId:req.user._id});
        res.status(200).json({user:req.user,address});
    } catch (error) {
        res.status(500).json({msg:'User data not found'});
        console.log(error);
    }
});
// app.get("/api/download",downloadImage);
app.get("/GetProduct",GetProduct);
app.post("/GetSearchResult",GetProduct);
app.post("/UpdateCart",authMiddleware,UpdateCart);
app.get("/GetCartProduct",authMiddleware,GetCartProduct);
app.post("/DeleteCartItem",authMiddleware,DeleteCart);
app.post("/PlaceOrder",authMiddleware,PlaceOrder);
app.get("/GetOrder",authMiddleware,GetOrder);
app.delete("/CancelOrder",authMiddleware,CancelOrder);
// app.get("/pay",PaymentGateway);

// GetOrder({
//     req:{
//         user:{
//             EmailAddress:"mdhanzla30@gmail.com",
//         }
//     },
//     res:{

//     }
// });
// uploadImage().then(()=>{
//     console.log("upload successful");
// })
// downloadImage().then(()=>{
//     console.log("download successful");
// });
// SetupUser().then(()=>{
//     console.log("working");
// })
// deleteUser("eotFA4kN2WMur0mOANKX").then(()=>{
//     console.log("user deleted");
// })
// updateUser("iHl3vGqQ4V6Ef4m9eoup",{
//     email:"1test@gmail.com",
//     password:"1test@test.com",
//     username:"1test"
// })
// getdata("GWFBZOIIb1ev0N85jpwx");


app.post("/register",Register);


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/temp/'); // Uploads folder where files will be stored
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

// Initialize multer middleware
const upload = multer({ storage: storage });

const bucket = admin.storage().bucket();
// Example route for file upload
// Backend endpoint to handle file upload
app.post('/upload', upload.single('image'), async (req, res) => {
    // Ensure a file was uploaded
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    // Path to the temporarily uploaded file on the server
    const filePath = req.file.path;
    const originalFileName = req.file.originalname;

    // Destination path in Firebase Storage
    const destination = 'images/' + originalFileName;
    console.log(req.body)
    try {
        // Upload file to Firebase Storage
        const uploadTask = await bucket.upload(filePath, {
            destination: destination,
            metadata: {
                contentType: req.file.mimetype // Set the content type
            }
        });

        // Optionally handle uploadTask events if needed
        // uploadTask.on('state_changed', (snapshot) => {
        //     // Handle upload progress or other events
        // });

        // Delete the temporarily uploaded file from local server after upload
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }

        // Respond with success message or relevant data
        res.status(200).json({ message: 'File uploaded successfully',data:req.body });
    } catch (error) {
        console.error('Error uploading file:', error);
        res.status(500).json({ error: 'Failed to upload file' });
    }
});


// app.post('/upload', async (req, res) => {
    // console.log(req.file)
    // try { 
    //     // Ensure a file was uploaded
    //     if (!req.file) {
    //         return res.status(400).json({ error: 'No file uploaded' });
    //     }

    //     const filePath = req.file.path; // Path to the temporarily uploaded file
    //     const originalFileName = req.file.originalname;

    //     // File destination in Firebase Storage (you can change the filename or path as needed)
    //     const destination = 'images/' + originalFileName;

    //     // Upload file to Firebase Storage
    //     await bucket.upload(filePath, {
    //         destination: destination,
    //         metadata: {
    //             contentType: req.file.mimetype // Set the content type
    //         }
    //     });

    //     // Delete the temporarily uploaded file from local server after upload
    //     fs.unlinkSync(filePath);

    //     // Respond with success message
    //     res.status(200).json({ message: 'File uploaded successfully' });
    // } catch (error) {
    //     console.error('Error uploading file:', error);
    //     res.status(500).json({ error: 'Failed to upload file' });
    // }
// });
// UpdateCart();
// DeleteCart();
// AddAddress();
// AddProduct();
// SellerRegister();
// Server listening on port 3000 for incoming requests
const port = 3000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
    connectDB().then(()=>{
            console.log('mongodb server is active')
    })
});