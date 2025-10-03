import React, { useState } from "react";
import { login } from "./AuthService";
import './App.css';

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login(username, password);
      if (res.error) {
        setError(res.error);
        return;
      }
      // Store token, username, and name in localStorage
      localStorage.setItem("token", res.token);
      localStorage.setItem("username", res.username);
      localStorage.setItem("name", res.name); // <-- fetch from backend
      window.location.href = "/";
    } catch (err) {
      setError("Server error");
    }
  };

  return (
    <div className="app-container">
      <div className="form-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" required/>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required/>
          <button type="submit">Login</button>
        </form>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </div>
  );
}
