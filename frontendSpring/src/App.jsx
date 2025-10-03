import React, { useState } from 'react';
import './App.css';
import ChatComponent from './components/ChatController';
import ImageGenerator from './components/ImageGenerator';
import RecipeGenerator from './components/RecipeGenerator';
import Login from './Login';
import Signup from './Signup';

function App() {
  const [activeTab, setActiveTab] = useState('image-generator');
  const [authTab, setAuthTab] = useState('login'); // toggle between login/signup

  const token = localStorage.getItem("token"); // check login status
  const name = localStorage.getItem("name"); // get user's full name

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleAuthTabChange = (tab) => {
    setAuthTab(tab);
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("name"); // remove name too
    window.location.reload();
  };

  if (!token) {
    // If not logged in, show login/signup
    return (
      <div style={{ maxWidth: 400, marginLeft: "500px" }}>
        <div style={{ marginBottom: 20 }}>
          <button onClick={() => handleAuthTabChange('login')} className={authTab==='login'?'active':''}>Login</button>
          <button onClick={() => handleAuthTabChange('signup')} className={authTab==='signup'?'active':''}>Signup</button>
        </div>
        {authTab === 'login' ? <Login /> : <Signup />}
      </div>
    );
  }

  // If logged in, show your main tabbed app
  return (
    <center className="App">
      {/* Welcome message */}
      <h2 style={{ marginBottom: 20 }}>Welcome, {name}!</h2>

      <div style={{ marginBottom: 20 }}>
        <button className={activeTab==='image-generator'?'active':''} onClick={()=>handleTabChange('image-generator')}>Image Generator</button>
        <button className={activeTab==='chat'?'active':''} onClick={()=>handleTabChange('chat')}>Chat</button>
        <button className={activeTab==='recipe-generator'?'active':''} onClick={()=>handleTabChange('recipe-generator')}>Recipe Generator</button>
        <button style={{ marginLeft: 20 }} onClick={logout}>Logout</button>
      </div>
      <div>
        {activeTab === 'image-generator' && <ImageGenerator />}
        {activeTab === 'chat' && <ChatComponent />}
        {activeTab === 'recipe-generator' && <RecipeGenerator />}
      </div>
    </center>
  );
}

export default App;
