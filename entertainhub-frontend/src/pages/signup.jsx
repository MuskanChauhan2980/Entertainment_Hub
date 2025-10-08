 import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "./signup.css";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/signup", {
        name,
        email,
        phone,
        password,
      });

      setMessage(response.data.message);

      // If backend returns user object with isSignup
      const user = response.data.user;
      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
      }

      // Redirect to OTP verification and pass email + optional postId
      const fromPostId = location.state?.fromPostId;
      navigate("/verify-otp", { state: { email, fromPostId } });
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.message);
      } else {
        setMessage("Signup failed. Try again!");
      }
    }
  };

  return (
    <div className="signup-container">
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="tel"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Signup</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
