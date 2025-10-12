import React, { useState, useEffect } from "react";
import "./forms.css";
import Navbar from "../components/Navbar";
import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api/venueRegistrationForm";

const VenueRegistrationForm = () => {
  const [form, setForm] = useState({
    venueName: "",
    venueType: "",
    contactPerson: "",
    email: "",
    phone: "",
    whatsapp: "",
    address: "",
    capacity: "",
    operatingHours: "",
    musicGenre: [],
    amenities: [],
    website: "",
    instagram: "",
    description: "",
    partnershipInterest: "",
    agreeToTerms: false,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // UPDATED: State for secure CAPTCHA logic
  const [captcha, setCaptcha] = useState({
    code: "", // The visual code (now dynamic)
    id: null, // The unique ID for backend verification
    input: "", // The user's typed answer
  });
  const [captchaError, setCaptchaError] = useState("");

  // New state for OTP flow
  const [otp, setOtp] = useState("");
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [otpError, setOtpError] = useState("");

  // --- CAPTCHA FETCH LOGIC ---
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

  // Fetch CAPTCHA on component mount
  useEffect(() => {
    fetchCaptcha();
  }, []);

  // Handler for CAPTCHA input
  const handleCaptchaChange = (e) => {
    setCaptcha({ ...captcha, input: e.target.value });
    if (captchaError) setCaptchaError("");
  };

  // Handler for OTP input
  const handleOtpChange = (e) => {
    setOtp(e.target.value);
    if (otpError) setOtpError("");
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      if (name === "musicGenre" || name === "amenities") {
        const currentValues = form[name] || [];
        if (checked) {
          setForm({ ...form, [name]: [...currentValues, value] });
        } else {
          setForm({
            ...form,
            [name]: currentValues.filter((item) => item !== value),
          });
        }
      } else {
        setForm({ ...form, [name]: checked });
      }
    } else {
      setForm({ ...form, [name]: value });
    }

    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleSendOtp = async () => {
    // Quick validation for required fields
    const emailOnlyErrors = {};
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email))
      emailOnlyErrors.email = "Email must be valid to send OTP";
    if (Object.keys(emailOnlyErrors).length > 0) {
      setErrors((prev) => ({ ...prev, ...emailOnlyErrors }));
      return;
    }

    setIsSubmitting(true);
    setOtpError("");
    try {
      const response = await axios.post(`${API_BASE_URL}/send-otp`, {
        email: form.email,
      });
      if (response.data.success) {
        setIsOtpSent(true);
        alert("OTP sent to your email. Please check your inbox.");
      } else {
        setOtpError(response.data.message || "Failed to send OTP.");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      setOtpError("A network error occurred while sending OTP. Try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp) {
      setOtpError("Please enter the OTP.");
      return;
    }

    setIsSubmitting(true);
    setOtpError("");
    try {
      const response = await axios.post(`${API_BASE_URL}/verify-otp`, {
        email: form.email,
        otp: otp,
      });

      if (response.data.success) {
        setIsEmailVerified(true);
        setOtpError("");
        alert("Email verified successfully!");
      } else {
        setOtpError(response.data.message || "Invalid or expired OTP.");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      setOtpError("Verification failed. Check the OTP or try resending.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!form.venueName.trim()) newErrors.venueName = "Venue name is required";
    if (!form.venueType) newErrors.venueType = "Venue type is required";
    if (!form.contactPerson.trim())
      newErrors.contactPerson = "Contact person is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    if (!form.phone.trim()) newErrors.phone = "Phone number is required";
    if (!form.address.trim()) newErrors.address = "Address is required";
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
      const response = await axios.post(
        `${API_BASE_URL}/submit`,
        submissionData
      );

      if (response.data.success) {
        console.log("Venue Form submitted:", form);
        alert(
          "Venue registration submitted successfully! We'll contact you soon."
        );
        setForm({
          venueName: "",
          venueType: "",
          contactPerson: "",
          email: "",
          phone: "",
          whatsapp: "",
          address: "",
          capacity: "",
          operatingHours: "",
          musicGenre: [],
          amenities: [],
          website: "",
          instagram: "",
          description: "",
          partnershipInterest: "",
          agreeToTerms: false,
        });
        setOtp("");
        setIsEmailVerified(false);
        setIsOtpSent(false);
        setErrors({});
        setOtpError("");
        fetchCaptcha();
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "A network error occurred. Failed to submit the form.";

      // Handle backend CAPTCHA validation error explicitly
      if (
        errorMessage.includes("CAPTCHA") ||
        errorMessage.includes("Invalid")
      ) {
        setCaptchaError(errorMessage);
        fetchCaptcha(); // Load a new CAPTCHA on validation failure
      }

      alert(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

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

  return (
    <div className="App">
      <Navbar showHero={false} />
      <section className="section">
        <div className="form-container">
          <div className="container">
            <div className="section-header">
              <h2>Venue Registration</h2>
              <p>
                Register your venue to partner with Dubai's premier nightlife
                platform
              </p>
            </div>

            <div className="form-wrapper">
              <form onSubmit={handleSubmit} className="custom-form">
                <div className="form-section">
                  <h3>Venue Information</h3>
                  <div className="form-grid">
                    <div className="form-group">
                      <label>
                        <span className="input-icon building"></span>
                        Venue Name *
                        <input
                          type="text"
                          name="venueName"
                          value={form.venueName}
                          onChange={handleChange}
                          className={errors.venueName ? "error" : ""}
                        />
                        {errors.venueName && (
                          <span className="field-error">
                            {errors.venueName}
                          </span>
                        )}
                      </label>
                    </div>
                    <div className="form-group">
                      <label>
                        Venue Type *
                        <select
                          name="venueType"
                          value={form.venueType}
                          onChange={handleChange}
                          className={errors.venueType ? "error" : ""}
                        >
                          <option value="">Select type</option>
                          <option value="nightclub">Nightclub</option>
                          <option value="lounge">Lounge</option>
                          <option value="bar">Bar</option>
                          <option value="beach-club">Beach Club</option>
                          <option value="pool-party">Pool Party Venue</option>
                          <option value="restaurant">Restaurant</option>
                          <option value="hotel">Hotel Venue</option>
                          <option value="rooftop">Rooftop</option>
                        </select>
                        {errors.venueType && (
                          <span className="field-error">
                            {errors.venueType}
                          </span>
                        )}
                      </label>
                    </div>
                    <div className="form-group">
                      <label>
                        <span className="input-icon user"></span>
                        Contact Person *
                        <input
                          type="text"
                          name="contactPerson"
                          value={form.contactPerson}
                          onChange={handleChange}
                          className={errors.contactPerson ? "error" : ""}
                        />
                        {errors.contactPerson && (
                          <span className="field-error">
                            {errors.contactPerson}
                          </span>
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
                  </div>
                </div>

                <div className="form-section">
                  <h3>Contact Details</h3>
                  <div className="form-grid">
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
                    <div className="form-group">
                      <label>
                        <span className="input-icon instagram"></span>
                        Instagram
                        <input
                          type="url"
                          name="instagram"
                          value={form.instagram}
                          onChange={handleChange}
                        />
                      </label>
                    </div>
                    <div className="form-group">
                      <label>
                        <span className="input-icon website"></span>
                        Website
                        <input
                          type="url"
                          name="website"
                          value={form.website}
                          onChange={handleChange}
                        />
                      </label>
                    </div>
                  </div>
                </div>

                <div className="form-section">
                  <h3>Venue Details</h3>
                  <div className="form-grid">
                    <div className="form-group full-width">
                      <label>
                        <span className="input-icon location"></span>
                        Address *
                        <input
                          type="text"
                          name="address"
                          value={form.address}
                          onChange={handleChange}
                          placeholder="Full venue address"
                          className={errors.address ? "error" : ""}
                        />
                        {errors.address && (
                          <span className="field-error">{errors.address}</span>
                        )}
                      </label>
                    </div>
                    <div className="form-group">
                      <label>
                        Capacity
                        <input
                          type="number"
                          name="capacity"
                          value={form.capacity}
                          onChange={handleChange}
                          placeholder="Number of people"
                        />
                      </label>
                    </div>
                    <div className="form-group">
                      <label>
                        Operating Hours
                        <input
                          type="text"
                          name="operatingHours"
                          value={form.operatingHours}
                          onChange={handleChange}
                          placeholder="e.g., 10 PM - 3 AM"
                        />
                      </label>
                    </div>
                  </div>
                </div>

                <div className="form-section">
                  <h3>Music & Amenities</h3>
                  <div className="checkbox-group">
                    <label>Music Genres Featured</label>
                    <div className="checkbox-grid">
                      {[
                        "House",
                        "Techno",
                        "Tech House",
                        "Deep House",
                        "Progressive",
                        "Trance",
                        "Hip Hop",
                        "R&B",
                        "Commercial",
                        "Open Format",
                      ].map((genre) => (
                        <label key={genre} className="checkbox-label">
                          <input
                            type="checkbox"
                            name="musicGenre"
                            value={genre.toLowerCase()}
                            onChange={handleChange}
                            checked={form.musicGenre.includes(
                              genre.toLowerCase()
                            )}
                          />
                          <span>{genre}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="checkbox-group">
                    <label>Amenities Available</label>
                    <div className="checkbox-grid">
                      {[
                        "VIP Tables",
                        "Dance Floor",
                        "Outdoor Area",
                        "Pool",
                        "Shisha",
                        "Food Service",
                        "Valet Parking",
                        "Coat Check",
                        "Smoking Area",
                        "Private Rooms",
                      ].map((amenity) => (
                        <label key={amenity} className="checkbox-label">
                          <input
                            type="checkbox"
                            name="amenities"
                            value={amenity.toLowerCase()}
                            onChange={handleChange}
                            checked={form.amenities.includes(
                              amenity.toLowerCase()
                            )}
                          />
                          <span>{amenity}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="form-section">
                  <h3>Additional Information</h3>
                  <div className="form-group full-width">
                    <label>
                      Venue Description
                      <textarea
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        placeholder="Describe your venue's atmosphere, unique features, target audience..."
                        rows="4"
                      />
                    </label>
                  </div>
                  <div className="form-group full-width">
                    <label>
                      Partnership Interest
                      <select
                        name="partnershipInterest"
                        value={form.partnershipInterest}
                        onChange={handleChange}
                      >
                        <option value="">Select interest</option>
                        <option value="event-promotion">Event Promotion</option>
                        <option value="guestlist-management">
                          Guestlist Management
                        </option>
                        <option value="table-booking">
                          Table Booking Service
                        </option>
                        <option value="dj-bookings">DJ Bookings</option>
                        <option value="full-partnership">
                          Full Partnership
                        </option>
                      </select>
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
                          Terms & Conditions
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
                    {isSubmitting ? "Registering..." : "Register Venue"}
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

export default VenueRegistrationForm;
