import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/login", {
        email,
        password
      });

      setMessage(response.data.message);

      // Redirect to OTP verification
      navigate("/verify-otp", { state: { email } });
    } catch (error) {
      if (error.response) setMessage(error.response.data.message);
      else setMessage("Login failed. Try again!");
    }
  };

  return (
    <div className="login-page">
      <h2 className="login-heading">Login</h2>
      <div className="login-container">
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
        {message && <p>{message}</p>}
      </div>
    </div>
  );
}
