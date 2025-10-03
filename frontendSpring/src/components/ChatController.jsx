import React, { useState } from 'react';

export default function ChatComponent() {
  const [prompt, setPrompt] = useState('');
  const [chatResponse, setChatResponse] = useState('');

  const askAI = async () => {
    const token = localStorage.getItem("token"); // get JWT from localStorage
    if (!token) {
      alert("You must be logged in to ask AI!");
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/ask?prompt=${encodeURIComponent(prompt)}`, {
        headers: {
          "Authorization": `Bearer ${token}` // send JWT
        }
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.text();
      setChatResponse(data);
    } catch (error) {
      console.error("Error Generating Response:", error);
      setChatResponse("Failed to get response from AI. Please try again.");
    }
  };

  return (
    <div>
      <h2>Ask To AI</h2>
      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Start Asking..."
      />
      <button onClick={askAI}>Ask AI</button>
      <div className="output">
        <p>{chatResponse}</p>
      </div>
    </div>
  );
}
