import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./verifyOTP.css";

export default function VerifyOTP() {
  const location = useLocation();
  const navigate = useNavigate();

  // Data passed from signup page
  const [email, setEmail] = useState(location.state?.email || "");
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const fromPostId = location.state?.fromPostId; // post the user wanted to read

  const handleVerify = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/verify-otp", { email, otp });
      setMessage(response.data.message);

      const user = response.data.user;

      if (user) {
        // ✅ Store verified user in localStorage
        localStorage.setItem("user", JSON.stringify(user));

        // ✅ If user came from a blog post → redirect back to blog and open article
        if (fromPostId) {
          navigate("/blog", { state: { postId: fromPostId } });
        } else {
          // ✅ Otherwise, just go to blog page
          navigate("/blog");
        }
      }
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
          readOnly // keep it fixed from signup step
        />
        <input
          type="text"
          placeholder="Enter 6-digit OTP"
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
