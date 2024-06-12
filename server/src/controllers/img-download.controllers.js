
import admin from 'firebase-admin';
import { FIRE_BASE } from '../constants.js';

// admin.initializeApp({
//     credential: admin.credential.cert(FIRE_BASE),
//     storageBucket: 'gs://test-4b354.appspot.com' // Replace with your bucket name
// });

const bucket = admin.storage().bucket();


import fs from 'fs'; // For file system access


let destinationPath = "./";
let fileName = "ayimg.jpg";


async function downloadImage() {
    try {
      const file = bucket.file(fileName);
      const [data] = await file.download();
  
      fs.writeFileSync(destinationPath, data);
      console.log(`File downloaded to ${destinationPath}`);
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  }
  
  // Example usage:++
export default downloadImage;