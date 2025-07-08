// src/components/Login.js

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const demoUser = {
    email: "demo@farmer.com",
    password: "kisan123",
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === demoUser.email && password === demoUser.password) {
      setMessage("✅ Login successful!");
      setTimeout(() => {
        navigate("/dashboard"); // change this route if needed
      }, 1000);
    } else {
      setMessage("❌ Invalid email or password.");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto", textAlign: "center" }}>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ width: "100%", padding: "10px", margin: "10px 0" }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ width: "100%", padding: "10px", margin: "10px 0" }}
        />
        <button type="submit" style={{ padding: "10px 20px" }}>
          Login
        </button>
      </form>
      <p style={{ color: message.includes("✅") ? "green" : "red" }}>{message}</p>
    </div>
  );
};

export default Login;
