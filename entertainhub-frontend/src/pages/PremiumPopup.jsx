import React from "react";
import "./models.css";

const PremiumPopup = () => {
  return (
    <div className="premium-popup">
      <div className="popup-content">
        <h2>Premium Access Only</h2>
        <p>You need to be a premium member to view this content.</p>
        <button onClick={() => alert("Redirect to signup/login")}>
          Login / Signup
        </button>
      </div>
    </div>
  );
};

export default PremiumPopup;
