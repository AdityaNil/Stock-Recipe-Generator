import React, { useState } from "react";
import { signup } from "./AuthService";
import './App.css';

export default function Signup() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await signup(username, password, name);
      if (res.error) {
        setError(res.error);
        return;
      }
      localStorage.setItem("token", res.token);
      localStorage.setItem("username", res.username);
      localStorage.setItem("name", res.name); // <-- store name
      window.location.href = "/";
    } catch (err) {
      setError("Server error");
    }
  };

  return (
    <div className="app-container">
      <div className="form-container">
        <h2>Signup</h2>
        <form onSubmit={handleSubmit}>
          <input value={name} onChange={e => setName(e.target.value)} placeholder="Full Name" required/>
          <input value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" required/>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required/>
          <button type="submit">Signup</button>
        </form>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </div>
  );
}
