import express from "express";
import bodyParser from "body-parser";
import logger from "morgan";
import dotenv from "dotenv";
import connectDB from "./db/index.js";

dotenv.config({
    path:'./.env'
});

import uploadImage from "./controllers/img-upload.controllers.js";
import downloadImage from "./controllers/img-download.controllers.js";
import cors from "cors";
import SetupUser from "./utils/user-add-data.utils.js";
import deleteUser from "./utils/user-del-data.utils.js";
import updateUser from "./utils/user-update-data.utils.js";
import getdata from  "./utils/user-get-data.utils.js"
export const app = express();

app.use(cors());
// Connect to database

// Connect to MongoDB GridFS bucket using mongoose

// Middleware for parsing request body and logging requests
app.use(bodyParser.json());
app.use(logger("dev"));

// Routes for API endpoints

// app.post("/upload/file", upload().single("file"), async (req, res) => {
//     try {
//       res.status(201).json({ text: "File uploaded successfully !" });
//     } catch (error) {
//       console.log(error);
//       res.status(400).json({
//         error: { text: "Unable to upload the file", error },
//       });
//     }
// });
app.get("/",downloadImage)
uploadImage().then(()=>{
    console.log("upload successful");
})
downloadImage().then(()=>{
    console.log("download successful");
});
SetupUser().then(()=>{
    console.log("working");
})
deleteUser("eotFA4kN2WMur0mOANKX").then(()=>{
    console.log("user deleted");
})
updateUser("iHl3vGqQ4V6Ef4m9eoup",{
    email:"1test@gmail.com",
    password:"1test@test.com",
    username:"1test"
})
getdata("GWFBZOIIb1ev0N85jpwx")
// Server listening on port 3000 for incoming requests
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
    connectDB().then(()=>{
            console.log('mongodb server is active')
    })
});