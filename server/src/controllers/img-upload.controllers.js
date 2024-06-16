
// import admin from 'firebase-admin';
// import { FIRE_BASE } from '../constants.js';

// admin.initializeApp({
//     credential: admin.credential.cert(FIRE_BASE),
//     storageBucket: 'gs://test-4b354.appspot.com' // Replace with your bucket name
// });

// const bucket = admin.storage().bucket();


// import fs from 'fs'; // For file system access

// let filePath = "./img.jpg";
// let fileName = "ayimg.jpg";

// const file = bucket.file(fileName);


// async function uploadImage() {
//   try {
//     const file = bucket.file(fileName);
//     const [exists] = await file.exists();

//     if (exists) {
//       console.log('File already exists in GCS');
//     } else {
//       const fileStream = fs.createReadStream(filePath);

//       const [fileMetadata] = await bucket.upload(filePath, {
//         destination: fileName,
//         metadata: {
//           contentType: 'image/jpeg' // Adjust based on your image type
//         }
//       });

//       console.log(`File uploaded to ${fileMetadata.name}`);
//     }
//   } catch (error) {
//     console.error('Error uploading file:', error);
//   }
// }


// const uploadTask = file.createWriteStream({
//   metadata: {
//     contentType: 'image/jpeg' // Adjust based on your image type
//   }
// });

// uploadTask.on('error', (err) => {
//   console.error('Error uploading file:', err);
// });

// uploadTask.on('state_changed', (snapshot) => {
//   // Calculate upload progress percentage
//   const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//   console.log(`Upload is ${progress}% done`);

//   switch (snapshot.state) {
//     case 'paused':
//       console.log('Upload is paused');
//       break;
//     case 'running':
//       console.log('Upload is running');
//       break;
//   }
// });

// // Pipe the file to the upload stream
// // import fs from 'fs';
// // fs.createReadStream(filePath);
// // fs.pipe(uploadTask);

// // Handle upload completion
// uploadTask.on('finish', () => {
//   console.log('File uploaded successfully.');
// });

// // Example usage:
// export default uploadImage;

import admin from 'firebase-admin';
import { FIRE_BASE } from '../constants.js';
import fs from 'fs'; // For file system access

// Initialize Firebase Admin SDK
admin.initializeApp({
    credential: admin.credential.cert(FIRE_BASE),
    storageBucket: 'gs://test-4b354.appspot.com' // Replace with your bucket name
});

// Get a reference to the storage service, which is used to create references in your storage bucket
export {admin};
const bucket = admin.storage().bucket();

let fileStream ;
const filePath = "./img.jpg";
const fileName = "1img.jpg";

export const getFileSize = async (filePath) => {
  try {
      const stats = await fs.promises.stat(filePath);
      return stats.size;
  } catch (error) {
      console.error('Error getting file size:', error);
      return -1; // Return -1 to indicate an error
  }
};
// Function to upload image to Firebase Storage
function cancelUpload() {
    if (fileStream) {
        fileStream.destroy(); // Close the file stream
        console.log('Upload cancelled.');
    } else {
        console.log('No upload in progress.');
    }
}
async function uploadImage() {
    try {
        // Check if the file already exists in the bucket
        const [exists] = await bucket.file(fileName).exists();

        if (exists) {
            console.log('File already exists in GCS');
        } else {
            // Create a read stream to the local file
            fileStream = fs.createReadStream(filePath);

            // Create a write stream to the destination file in Firebase Storage
            const uploadStream = bucket.file(fileName).createWriteStream({
                metadata: {
                    contentType: 'image/jpg' // Adjust based on your image type
                }
            });

            // Handle stream events
            uploadStream.on('error', (err) => {
                console.error('Error uploading file:', err);
            });
          
          let fileBytes = 0;
          const fileSize = await getFileSize(filePath);
          fileStream.on('data', (chunk) => {
                    console.log(chunk);
                    fileBytes += chunk.length;
                    console.log(fileBytes);
                    console.log(fileSize);
                    const progress = (fileBytes / fileSize) * 100;
                    // if(progress.toFixed(2) > 50){
                    //     cancelUpload();
                    // }
                    console.log(`Upload is ${progress.toFixed(2)}% done`);
          });
          
          // Handle upload completion
            uploadStream.on('finish', () => {
                console.log('File uploaded successfully.');
            });

            // Pipe the file stream to the upload stream
            fileStream.pipe(uploadStream);
        }
    } catch (error) {
        console.error('Error uploading file:', error);
    }
}

// Example usage:
// uploadImage();


// Export the function for external usage
export default uploadImage;
