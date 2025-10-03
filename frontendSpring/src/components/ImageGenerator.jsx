import React, { useState } from 'react';

export default function ImageGenerator() {
    const [prompt, setPrompt] = useState('');
    const [imageUrls, setImageUrls] = useState([]);

    const token = localStorage.getItem("token"); // get JWT

    const generateImage = async () => {
        if (!token) {
            alert("You must be logged in to generate images!");
            return;
        }

        if (!prompt) {
            alert("Please enter a prompt!");
            return;
        }

        try {
            const response = await fetch(
                `http://localhost:8080/generate_image?prompt=${encodeURIComponent(prompt)}`,
                {
                    headers: {
                        "Authorization": `Bearer ${token}` // send JWT
                    }
                }
            );

            if (!response.ok) {
                throw new Error(`Server error: ${response.status}`);
            }

            const urls = await response.json();
            setImageUrls(urls);
        } catch (error) {
            console.error("Error Generating Image:", error);
            alert("Failed to generate images. Please try again.");
        }
    };

    return (
        <div className='tab-content'>
            <h2>Generate Image</h2>
            <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder='Enter Prompt For Image'
            />
            <button onClick={generateImage}>Generate Image</button>

            <div className='image-grid'>
                {imageUrls.map((url, index) => (
                    <img key={index} src={url} alt={`Generated ${index}`} />
                ))}
                {[...Array(4 - imageUrls.length)].map((_, index) => (
                    <div key={index + imageUrls.length} className="empty-image-slot"></div>
                ))}
            </div>
        </div>
    );
}
