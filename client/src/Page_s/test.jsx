// import React, { useState } from 'react';
// import axios from 'axios';

// const Test = () => {
//     const [imageData, setImageData] = useState(null);
//     const [progress, setProgress] = useState(0);
//     const [image, setImage] = useState(null); // Initialize image state with null

//     // Function to download an image
//     // const downloadImage = async () => {
//     //     try {
//     //         const imageUrl = 'http://localhost:3000/'; // Replace with the URL of the image you want to download
//     //         const response = await axios.get(imageUrl, {
//     //             responseType: 'blob', // Receive binary data
//     //             onDownloadProgress: progressEvent => {
//     //                 const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
//     //                 setProgress(percentCompleted);
//     //             }
//     //         });
//     //         setImageData(response.data); // Set downloaded image data
//     //     } catch (error) {
//     //         console.error('Error downloading image:', error);
//     //     }
//     // };

//     const downloadImage = async () => {
//         try {
//             const imageUrl = 'http://localhost:3000/api/download'; // Replace with the URL of the image you want to download
//             const response = await axios.get(imageUrl, {
//                 responseType: 'blob', // Receive binary data
//                 onDownloadProgress: progressEvent => {
//                     const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
//                     setProgress(percentCompleted);
//                 }
//             });
//             setImageData(response.data); // Set downloaded image data
//         } catch (error) {
//             console.error('Error downloading image:', error);
//         }
//     };

//     // Function to handle file upload
//     const handleUpload = (e) => {
//         setImage(e.target.files[0]); // Set selected file object to image state
//     };

//     // Function to handle file upload API call
//     const handleuploadApi = async (e) => {
//         e.preventDefault();
        
//         if (!image) {
//             console.error('Please select a file.');
//             return;
//         }

//         const formdata = new FormData();
//         formdata.append('image', image);
//         formdata.append('username', 'user');
//         console.log(formdata);
//         try {
//             const response = await axios.post('http://localhost:3000/upload', formdata);
//             console.log('Upload successful:', response);
//             // Optionally, handle response or update UI after successful upload
//         } catch (error) {
//             console.error('Error uploading file:', error);
//         }
//     };

//     return (
//         <div>
//             <button onClick={downloadImage}>Download Image</button>
//             {progress > 0 && <div>{progress}% downloaded</div>}
//             {imageData && (
//                 <img
//                     src={URL.createObjectURL(imageData)}
//                     alt="Downloaded Image"
//                     style={{ width: '100%', height: '100%' }}
//                 />
//             )}
//             <div>
//                 <input type="file" onChange={handleUpload} />
//                 <button onClick={handleuploadApi}>Upload</button>
//             </div>
//         </div>
//     );
// };

// export default Test;

import React, { useState } from 'react';
import axios from 'axios';

const Test = () => {
  const [imageData, setImageData] = useState(null);
  const [progress, setProgress] = useState(null);

  const downloadImage = async () => {
    try {
      const imageUrl = 'http://localhost:3000/api/download'; // Replace with your server URL
      const response = await axios.get(imageUrl, {
        responseType: 'blob', // Receive binary data
        onDownloadProgress: progressEvent => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setProgress(percentCompleted);
        }
      });
      setImageData(response.data); // Set downloaded image data
    } catch (error) {
      console.error('Error downloading image:', error);
    }
  };

  // Call downloadImage function when component mounts
//   useEffect(() => {
//     downloadImage();
//   }, []);

  return (
    <div>
      <h1>Downloaded Image</h1>
      {progress < 100 ? (
        <p>Downloading... {progress}%</p>
      ) : (
        <img src={imageData ? URL.createObjectURL(imageData) : ''} style={{width:"100%"}} alt="Downloaded" />
      )}
      <button onClick={() => downloadImage()}>download</button>
    </div>
  );
};

export default Test;
