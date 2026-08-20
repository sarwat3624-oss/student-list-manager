import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
    const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Login failed");
        return;
      }

      localStorage.setItem("token", data.token);

      setMessage("Login successful!");
      
      console.log("Login data:", data);
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      setMessage("Server se connection nahi ho raha.");
    }
  };

  return (
  <div className="login-page">
    <div className="login-card">
      <h1 className="login-title">Welcome Back</h1>

      <p className="login-subtitle">
        Login to Student Manager
      </p>

      <form className="login-form" onSubmit={handleLogin}>
        <label className="login-label">
          Email
        </label>

        <input
          className="login-input"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className="login-label">
          Password
        </label>

        <input
          className="login-input"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="login-button" type="submit">
          Login
        </button>
      </form>

      {message && (
        <p className="login-message">
          {message}
        </p>
      )}
    </div>
  </div>
);
}

export default Login;