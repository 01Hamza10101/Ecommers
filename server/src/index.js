import express from "express";
import bodyParser from "body-parser";
import logger from "morgan";
import dotenv from "dotenv";
import connectDB from "./db/index.js";
dotenv.config();
import uploadImage from "./controllers/img-upload.controllers.js";
import downloadImage from "./controllers/img-download.controllers.js";
export const app = express();

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
uploadImage().then(()=>{
    console.log("upload successful");
    // downloadImage().then(()=>{
    //     console.log("download successful");
    // });
})

// Server listening on port 3000 for incoming requests
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
    connectDB().then(()=>{
            console.log('mongodb server is active')
    })
});