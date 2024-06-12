
import admin from 'firebase-admin';
import { FIRE_BASE } from '../constants.js';

admin.initializeApp({
    credential: admin.credential.cert(FIRE_BASE),
    storageBucket: 'gs://test-4b354.appspot.com' // Replace with your bucket name
});

const bucket = admin.storage().bucket();


import fs from 'fs'; // For file system access

let filePath = "./img.jpg";
let fileName = "ayimg.jpg";

const file = bucket.file(fileName);


async function uploadImage() {
  try {
    const file = bucket.file(fileName);
    const [exists] = await file.exists();

    if (exists) {
      console.log('File already exists in GCS');
    } else {
      const fileStream = fs.createReadStream(filePath);

      const [fileMetadata] = await bucket.upload(filePath, {
        destination: fileName,
        metadata: {
          contentType: 'image/jpeg' // Adjust based on your image type
        }
      });

      console.log(`File uploaded to ${fileMetadata.name}`);
    }
  } catch (error) {
    console.error('Error uploading file:', error);
  }
}


const uploadTask = file.createWriteStream({
  metadata: {
    contentType: 'image/jpeg' // Adjust based on your image type
  }
});

uploadTask.on('error', (err) => {
  console.error('Error uploading file:', err);
});

uploadTask.on('state_changed', (snapshot) => {
  // Calculate upload progress percentage
  const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  console.log(`Upload is ${progress}% done`);

  switch (snapshot.state) {
    case 'paused':
      console.log('Upload is paused');
      break;
    case 'running':
      console.log('Upload is running');
      break;
  }
});

// Pipe the file to the upload stream
// import fs from 'fs';
// fs.createReadStream(filePath);
// fs.pipe(uploadTask);

// Handle upload completion
uploadTask.on('finish', () => {
  console.log('File uploaded successfully.');
});

// Example usage:
export default uploadImage;