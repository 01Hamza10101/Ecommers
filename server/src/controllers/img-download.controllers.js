
import admin from 'firebase-admin';
import { FIRE_BASE } from '../constants.js';
import { getFileSize } from './img-upload.controllers.js';

const bucket = admin.storage().bucket();


import fs from 'fs'; // For file system access


let destinationPath = "./public/temp/1img.jpg";
let fileName = "1img.jpg";


async function downloadImage(req,res) {
    try {
      const file = bucket.file(fileName);

      const [data] = await file.download();
      // let fileBytes = 0;
      //     const fileSize = await getFileSize(filePath);
      //     file.on('data', (chunk) => {
      //               console.log(chunk);
      //               fileBytes += chunk.length;
      //               console.log(fileBytes);
      //               console.log(fileSize);
      //               const progress = (fileBytes / fileSize) * 100;
      //               // if(progress.toFixed(2) > 50){
      //               //     cancelUpload();
      //               // }
      //               console.log(`Upload is ${progress.toFixed(2)}% done`);
      //     });
      // console.log(data);
      res.contentType('image/jpeg');
      res.send(data);
      // fs.writeFileSync(destinationPath, data);
      console.log(`File downloaded to ${destinationPath}`);
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  }
  
  // Example usage:++
export default downloadImage;