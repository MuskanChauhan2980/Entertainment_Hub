import { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "./verifyOTP.css";

export default function VerifyOTP() {
  const location = useLocation();
  const [email, setEmail] = useState(location.state?.email || "");
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");

  const handleVerify = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/verify-otp", { email, otp });
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data?.message || "Verification failed");
    }
  };

  return (
    <div className="verify-container">
      <h2>Verify OTP</h2>
      <form onSubmit={handleVerify}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          readOnly // optional, prevents changing email
        />
        <input
          type="text"
          placeholder="OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
        />
        <button type="submit">Verify OTP</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
