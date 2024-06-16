import React, { useState } from 'react';
import axios from 'axios';

const Test = () => {
    const [imageData, setImageData] = useState(null);
    const [progress, setProgress] = useState(0);

    const downloadImage = async () => {
        try {
            const imageUrl = 'http://localhost:3000/'; // Replace with the URL of the image you want to download
            const response = await axios.get(imageUrl, {
                responseType: 'blob', // Set responseType to 'blob' to receive binary data
                onDownloadProgress: progressEvent => {
                    const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    setProgress(percentCompleted);
                }
            });
            setImageData(response.data);
        } catch (error) {
            console.error('Error downloading image:', error);
        }
    };

    return (
        <div>
            <button onClick={downloadImage}>Download Image</button>
            {progress > 0 && <div>{progress}% downloaded</div>}
            {imageData && (
                <img
                    src={URL.createObjectURL(imageData)}
                    alt="Downloaded Image"
                    style={{ width: '100%', height: '100%' }} // Set width and height using inline styles
                />
            )}
        </div>
    );
}

export default Test;
