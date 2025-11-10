import React from 'react';
import { useState } from "react";
import { useUser } from "../../context.jsx";
import { useNavigate } from "react-router-dom";

import "./Login.css";

export default function Login() {
  const { setUser } = useUser();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include'
      });

      const data = await response.json();

      if (!response.ok) {
        // Handle validation errors (422) and other errors
        if (response.status === 422 && data.errors) {
          const errorMessages = Object.values(data.errors).join(", ");
          throw new Error(errorMessages);
        }
        throw new Error(data.message || "Login failed");
      }

      // Store token and user data
      localStorage.setItem('token', data.accessToken);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      // Store user data in context
      setUser(data.user);
      
      // Show success message
      alert("Login successful! Welcome back!");
      
      // Redirect to dashboard
      navigate("/");
      
    } catch (error) {
      console.error("Login error:", error);
      setError(error.message || "Failed to connect to server. Please check if the server is running.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={isLoading}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={isLoading}
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}