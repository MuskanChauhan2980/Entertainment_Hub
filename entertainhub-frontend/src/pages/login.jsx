import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "./login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // 🔥 Send login request to backend
      const res = await axios.post("/api/login", { email, password });

      // Save user & token locally
      localStorage.setItem("user", JSON.stringify(res.data.user));
      localStorage.setItem("token", res.data.token);

      setMessage(res.data.message || "Login successful!");

      // Redirect user (if came from blog or directly to blog)
      const redirectTo = location.state?.from || "/blog";
      navigate(redirectTo);
    } catch (err) {
      setMessage(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
}
