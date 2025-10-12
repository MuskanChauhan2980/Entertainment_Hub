import React, { useState,useEffect } from "react";
import "./Forms.css";
import axios from 'axios'; 
import Navbar from "../components/Navbar";
const API_BASE_URL = "http://localhost:5000/api/bookingForm";
const GuestlistTableBookingForm = () => {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    whatsapp: "",
    instagram: "",
    eventType: "",
    preferredVenue: "",
    date: "",
    guestCount: "",
    tableType: "",
    budget: "",
    specialRequests: "",
    agreeToTerms: false,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingType, setBookingType] = useState("guestlist"); // "guestlist" or "table"
  const [captcha, setCaptcha] = useState({
    code: "", // The visual code (now dynamic)
    id: null, // The unique ID for backend verification
    input: "", // The user's typed answer
  });
  const [captchaError, setCaptchaError] = useState("");

  // New state for OTP flow
      const [otp, setOtp] = useState('');
      const [isEmailVerified, setIsEmailVerified] = useState(false);
      const [isOtpSent, setIsOtpSent] = useState(false);
      const [otpError, setOtpError] = useState('');

  

  const fetchCaptcha = async () => {
    try {
      // Endpoint to fetch the dynamic CAPTCHA code and ID
      const response = await axios.get(`${API_BASE_URL}/captcha`);
      setCaptcha({
        code: response.data.codeToDisplay,
        id: response.data.captchaId,
        input: "", // Clear previous input
      });
      setCaptchaError("");
    } catch (error) {
      console.error("Failed to fetch CAPTCHA:", error);
      setCaptchaError("Failed to load security code.");
      // Fallback: If backend is down, use a placeholder but alert user
      setCaptcha({ code: "ERROR", id: "0", input: "" });
    }
  };

  useEffect(() => {
    fetchCaptcha();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });

    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };


  const handleSendOtp = async () => {
      // Quick validation for required fields
      const emailOnlyErrors = {};
      if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) emailOnlyErrors.email = "Email must be valid to send OTP";
      if (Object.keys(emailOnlyErrors).length > 0) {
          setErrors(prev => ({...prev, ...emailOnlyErrors}));
          return;
      }

      setIsSubmitting(true);
      setOtpError('');
      try {
          const response = await axios.post(`${API_BASE_URL}/send-otp`, { email: form.email });
          if (response.data.success) {
              setIsOtpSent(true);
              alert('OTP sent to your email. Please check your inbox.');
          } else {
              setOtpError(response.data.message || 'Failed to send OTP.');
          }
      } catch (error) {
          console.error('Error sending OTP:', error);
          setOtpError('A network error occurred while sending OTP. Try again.');
      } finally {
          setIsSubmitting(false);
      }
  };

  const handleVerifyOtp = async () => {
      if (!otp) {
          setOtpError('Please enter the OTP.');
          return;
      }

      setIsSubmitting(true);
      setOtpError('');
      try {
          const response = await axios.post(`${API_BASE_URL}/verify-otp`, { 
              email: form.email, 
              otp: otp 
          });
          
          if (response.data.success) {
              setIsEmailVerified(true);
              setOtpError('');
              alert('Email verified successfully!');
          } else {
              setOtpError(response.data.message || 'Invalid or expired OTP.');
          }
      } catch (error) {
          console.error('Error verifying OTP:', error);
          setOtpError('Verification failed. Check the OTP or try resending.');
      } finally {
          setIsSubmitting(false);
      }
  };
  // Handler for CAPTCHA input
  const handleCaptchaChange = (e) => {
    setCaptcha({ ...captcha, input: e.target.value });
    if (captchaError) setCaptchaError("");
  };

  // Handler for OTP input
  const handleOtpChange = (e) => {
    setOtp(e.target.value);
    if (otpError) setOtpError('');
  };


  // Helper to render CAPTCHA (UPDATED JSX)
  const renderCaptcha = () => {
    return (
      <div className="captcha-section">
        <div className="captcha-placeholder">
          <div className="captcha-box">
            <p>Enter the code below:</p>
            {/* Display dynamic CAPTCHA code */}
            <div className="captcha-code">{captcha.code || "Loading..."}</div>

            <input
              type="text"
              placeholder="Enter CAPTCHA code"
              value={captcha.input}
              onChange={handleCaptchaChange}
              className={captchaError ? "error" : ""}
              // Required for client-side validation check
              required
            />
            {/* Refresh button */}
            <button
              type="button"
              onClick={fetchCaptcha}
              disabled={isSubmitting}
              className="captcha-refresh-btn"
            >
              <i className="fas fa-redo-alt"></i> Refresh
            </button>
          </div>
        </div>
        {captchaError && <span className="field-error">{captchaError}</span>}
        {errors.captcha && (
          <span className="field-error">{errors.captcha}</span>
        )}
      </div>
    );
  };

  const validateForm = () => {
    const newErrors = {};
    if (!form.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    if (!form.phone.trim()) newErrors.phone = "Phone number is required";
    if (!form.date) newErrors.date = "Date is required";
    if (!form.guestCount) newErrors.guestCount = "Guest count is required";
    if (bookingType === "table" && !form.budget)
      newErrors.budget = "Budget is required for table booking";
    if (!form.agreeToTerms)
      newErrors.agreeToTerms = "You must agree to the terms";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
  
      const submissionData = {
        ...form,
        userCaptchaAnswer: captcha.input, // User's CAPTCHA input
        captchaId: captcha.id, // The unique ID for backend verification
    };
      try {
        const response = await axios.post(`${API_BASE_URL}/submit`, submissionData);
      
      if (response.data.success) {
      console.log("Booking Form submitted:", { ...form, bookingType });
      alert(
        `Your ${
          bookingType === "guestlist" ? "guestlist" : "table"
        } request has been submitted! We'll confirm shortly.`
      );
      setForm({
        fullName: "",
        email: "",
        phone: "",
        whatsapp: "",
        instagram: "",
        eventType: "",
        preferredVenue: "",
        date: "",
        guestCount: "",
        tableType: "",
        budget: "",
        specialRequests: "",
        agreeToTerms: false,
      });
      setBookingType("guestlist");
    setOtp('');
      setIsEmailVerified(false);
          setIsOtpSent(false);
          setErrors({});
          setOtpError('');
          fetchCaptcha(); 
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "A network error occurred. Failed to submit the form.";
      
      // Handle backend CAPTCHA validation error explicitly
      if (errorMessage.includes("CAPTCHA") || errorMessage.includes("Invalid")) {
          setCaptchaError(errorMessage);
          fetchCaptcha(); // Load a new CAPTCHA on validation failure
      }
      
      alert(errorMessage);
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };


      // Helper to render the OTP/Email verification section (Unchanged)
  const renderEmailVerification = () => {
    if (isEmailVerified) {
      return <p className="success-message">✅ Email Verified. You can now submit the form.</p>;
    }
    
    if (!isOtpSent) {
      return (
        <div className="otp-action">
          <button type="button" onClick={handleSendOtp} disabled={isSubmitting || errors.email || !form.email}>
            {isSubmitting ? 'Sending...' : 'Send Verification OTP'}
          </button>
          {errors.email && <span className="field-error">{errors.email}</span>}
        </div>
      );
    }
    
    return (
      <div className="otp-verification-group">
        <div className="form-group">
          <label>
            Enter OTP
            <input
              type="text"
              name="otp"
              value={otp}
              onChange={handleOtpChange}
              placeholder="6-digit code"
              maxLength="6"
            />
            {otpError && <span className="field-error">{otpError}</span>}
          </label>
        </div>
        <button type="button" onClick={handleVerifyOtp} disabled={isSubmitting || !otp}>
          {isSubmitting ? 'Verifying...' : 'Verify OTP'}
        </button>
        <button type="button" onClick={handleSendOtp} disabled={isSubmitting} className="resend-btn">
          Resend OTP
        </button>
      </div>
    );
  };


  return (
    <div className="App">
      <Navbar showHero={false} />
      <section className="section">
        <div className="form-container">
          <div className="container">
            <div className="section-header">
              <h2>Guestlist & Table Booking</h2>
              <p>Reserve your spot at Dubai's most exclusive venues</p>
            </div>

            <div className="form-wrapper">
              <form onSubmit={handleSubmit} className="custom-form">
                {/* Booking Type Selection */}
                <div className="form-section">
                  <h3>Booking Type</h3>
                  <div className="booking-type-selector">
                    <div className="booking-options">
                      <label
                        className={`booking-option ${
                          bookingType === "guestlist" ? "active" : ""
                        }`}
                      >
                        <input
                          type="radio"
                          name="bookingType"
                          value="guestlist"
                          checked={bookingType === "guestlist"}
                          onChange={() => setBookingType("guestlist")}
                        />
                        <div className="option-content">
                          <h4>Guestlist</h4>
                          <p>Free entry & priority access</p>
                          <ul>
                            <li>✓ Skip the line</li>
                            <li>✓ Free entry</li>
                            <li>✓ Welcome drinks (ladies)</li>
                          </ul>
                        </div>
                      </label>

                      <label
                        className={`booking-option ${
                          bookingType === "table" ? "active" : ""
                        }`}
                      >
                        <input
                          type="radio"
                          name="bookingType"
                          value="table"
                          checked={bookingType === "table"}
                          onChange={() => setBookingType("table")}
                        />
                        <div className="option-content">
                          <h4>VIP Table</h4>
                          <p>Premium bottle service experience</p>
                          <ul>
                            <li>✓ Reserved table</li>
                            <li>✓ Bottle service</li>
                            <li>✓ VIP host</li>
                          </ul>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="form-section">
                  <h3>Personal Information</h3>
                  <div className="form-grid">
                    <div className="form-group">
                      <label>
                        <span className="input-icon user"></span>
                        Full Name *
                        <input
                          type="text"
                          name="fullName"
                          value={form.fullName}
                          onChange={handleChange}
                          className={errors.fullName ? "error" : ""}
                        />
                        {errors.fullName && (
                          <span className="field-error">{errors.fullName}</span>
                        )}
                      </label>
                    </div>
                    <div className="form-group">
                      <label>
                        <span className="input-icon email"></span>
                        Email *
                        <input
                          type="email"
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          className={errors.email ? "error" : ""}
                        />
                        {errors.email && (
                          <span className="field-error">{errors.email}</span>
                        )}
                      </label>
                      {renderEmailVerification()}
                    </div>
                    <div className="form-group">
                      <label>
                        <span className="input-icon phone"></span>
                        Phone Number *
                        <input
                          type="tel"
                          name="phone"
                          value={form.phone}
                          onChange={handleChange}
                          className={errors.phone ? "error" : ""}
                        />
                        {errors.phone && (
                          <span className="field-error">{errors.phone}</span>
                        )}
                      </label>
                    </div>
                    <div className="form-group">
                      <label>
                        <span className="input-icon whatsapp"></span>
                        WhatsApp
                        <input
                          type="tel"
                          name="whatsapp"
                          value={form.whatsapp}
                          onChange={handleChange}
                        />
                      </label>
                    </div>
                  </div>
                </div>

                <div className="form-section">
                  <h3>Booking Details</h3>
                  <div className="form-grid">
                    <div className="form-group">
                      <label>
                        <span className="input-icon instagram"></span>
                        Instagram
                        <input
                          type="text"
                          name="instagram"
                          value={form.instagram}
                          onChange={handleChange}
                          placeholder="@username"
                        />
                      </label>
                    </div>
                    <div className="form-group">
                      <label>
                        Event Type
                        <select
                          name="eventType"
                          value={form.eventType}
                          onChange={handleChange}
                        >
                          <option value="">Select event type</option>
                          <option value="regular-night">Regular Night</option>
                          <option value="special-event">Special Event</option>
                          <option value="ladies-night">Ladies Night</option>
                          <option value="brunch">Brunch</option>
                          <option value="pool-party">Pool Party</option>
                          <option value="birthday">Birthday Celebration</option>
                          <option value="corporate">Corporate Event</option>
                        </select>
                      </label>
                    </div>
                    <div className="form-group">
                      <label>
                        Preferred Venue
                        <select
                          name="preferredVenue"
                          value={form.preferredVenue}
                          onChange={handleChange}
                        >
                          <option value="">Select venue</option>
                          <option value="white-dubai">White Dubai</option>
                          <option value="base-dubai">BASE Dubai</option>
                          <option value="sbeach-dubai">S Beach</option>
                          <option value="blu-dubai">BLU Dubai</option>
                          <option value="treehouse">Treehouse</option>
                          <option value="iris-dubai">IRIS Dubai</option>
                          <option value="not-sure">
                            Not Sure - Need Recommendations
                          </option>
                        </select>
                      </label>
                    </div>
                    <div className="form-group">
                      <label>
                        Date *
                        <input
                          type="date"
                          name="date"
                          value={form.date}
                          onChange={handleChange}
                          className={errors.date ? "error" : ""}
                        />
                        {errors.date && (
                          <span className="field-error">{errors.date}</span>
                        )}
                      </label>
                    </div>
                  </div>

                  <div className="form-grid">
                    <div className="form-group">
                      <label>
                        Number of Guests *
                        <select
                          name="guestCount"
                          value={form.guestCount}
                          onChange={handleChange}
                          className={errors.guestCount ? "error" : ""}
                        >
                          <option value="">Select guests</option>
                          <option value="1-2">1-2 people</option>
                          <option value="3-5">3-5 people</option>
                          <option value="6-10">6-10 people</option>
                          <option value="11-15">11-15 people</option>
                          <option value="16-20">16-20 people</option>
                          <option value="20+">20+ people</option>
                        </select>
                        {errors.guestCount && (
                          <span className="field-error">
                            {errors.guestCount}
                          </span>
                        )}
                      </label>
                    </div>

                    {bookingType === "table" && (
                      <>
                        <div className="form-group">
                          <label>
                            Table Type
                            <select
                              name="tableType"
                              value={form.tableType}
                              onChange={handleChange}
                            >
                              <option value="">Select table type</option>
                              <option value="standard">Standard Table</option>
                              <option value="premium">Premium Table</option>
                              <option value="vip">VIP Table</option>
                              <option value="skybox">Skybox/Lounge</option>
                            </select>
                          </label>
                        </div>
                        <div className="form-group">
                          <label>
                            Budget (AED) *
                            <select
                              name="budget"
                              value={form.budget}
                              onChange={handleChange}
                              className={errors.budget ? "error" : ""}
                            >
                              <option value="">Select budget</option>
                              <option value="1000-2000">1,000 - 2,000</option>
                              <option value="2000-5000">2,000 - 5,000</option>
                              <option value="5000-10000">5,000 - 10,000</option>
                              <option value="10000-20000">
                                10,000 - 20,000
                              </option>
                              <option value="20000+">20,000+</option>
                            </select>
                            {errors.budget && (
                              <span className="field-error">
                                {errors.budget}
                              </span>
                            )}
                          </label>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <div className="form-section">
                  <h3>Additional Information</h3>
                  <div className="form-group full-width">
                    <label>
                      Special Requests
                      <textarea
                        name="specialRequests"
                        value={form.specialRequests}
                        onChange={handleChange}
                        placeholder="Any special requirements, celebrations, or preferences..."
                        rows="4"
                      />
                    </label>
                  </div>
                </div>

                <div className="form-section">
                  {/* CAPTCHA - RENDERED HERE */}
                  {renderCaptcha()}
                  <div className="terms-section">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        name="agreeToTerms"
                        checked={form.agreeToTerms}
                        onChange={handleChange}
                        className={errors.agreeToTerms ? "error" : ""}
                      />
                      <span>
                        I agree to the{" "}
                        <a href="/terms" target="_blank">
                          Booking Terms & Conditions
                        </a>{" "}
                        *
                      </span>
                    </label>
                    {errors.agreeToTerms && (
                      <span className="field-error">{errors.agreeToTerms}</span>
                    )}
                  </div>
                </div>

                <div className="form-actions">
                  <button
                    type="submit"
                    className="submit-btn"
                    disabled={isSubmitting}
                  >
                    {isSubmitting
                      ? "Processing..."
                      : `Request ${
                          bookingType === "guestlist"
                            ? "Guestlist"
                            : "Table Booking"
                        }`}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GuestlistTableBookingForm;
