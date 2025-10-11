import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "./login.css";
import Navbar from "../components/Navbar";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/api/login", { email, password });

      localStorage.setItem("user", JSON.stringify(res.data.user));
      localStorage.setItem("token", res.data.token);

      setMessage(res.data.message || "Login successful!");

      const redirectTo = location.state?.from || "/";
      navigate(redirectTo);
    } catch (err) {
      setMessage(err.response?.data?.message || "Login failed");
    }
  };

  return (
     <div className="App">
      <Navbar showHero={false} />
      <section className="section"> 
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

      <div className="signup-link">
        Don't have an account?{" "}
        <span onClick={() => navigate("/signup")}>Sign up here</span>
      </div>
    </div>
    </section>
   </div>
  );
}
