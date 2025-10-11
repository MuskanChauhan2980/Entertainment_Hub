 import React, { useState, useEffect } from "react";
import "./ContactForm.css"; // Assuming your original CSS file is in place
import axios from 'axios'; // Import axios for API calls

const API_BASE_URL = "http://localhost:5000/api/contact"; // **CONFIRM YOUR BACKEND URL**

const ContactForm = () => {
  const initialFormState = {
    fullName: "",
    email: "",
    directCallingNumber: "",
    whatsappNumber: "",
    instagramUrl: "",
    tiktokUrl: "",
    facebookUrl: "",
    gender: "",
    dateOfBirth: "",
    relationshipStatus: "",
    sexualOrientation: "",
    hearAboutUs: "",
    purposeOfContact: "",
    message: "",
    agreeToTerms: false
  };

  const [form, setForm] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // New state for OTP flow
  const [otp, setOtp] = useState('');
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [otpError, setOtpError] = useState('');
  
  // UPDATED: State for secure CAPTCHA logic
  const [captcha, setCaptcha] = useState({
    code: '', // The visual code (now dynamic)
    id: null, // The unique ID for backend verification
    input: '', // The user's typed answer
  });
  const [captchaError, setCaptchaError] = useState('');

  // --- CAPTCHA FETCH LOGIC ---
  const fetchCaptcha = async () => {
    try {
      // Endpoint to fetch the dynamic CAPTCHA code and ID
      const response = await axios.get(`${API_BASE_URL}/captcha`); 
      setCaptcha({
        code: response.data.codeToDisplay,
        id: response.data.captchaId,
        input: '', // Clear previous input
      });
      setCaptchaError('');
    } catch (error) {
      console.error("Failed to fetch CAPTCHA:", error);
      setCaptchaError('Failed to load security code.');
      // Fallback: If backend is down, use a placeholder but alert user
      setCaptcha({ code: 'ERROR', id: '0', input: '' }); 
    }
  };

  // Fetch CAPTCHA on component mount
  useEffect(() => {
    fetchCaptcha();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === 'checkbox' ? checked : value
    });
    
    // Clear errors when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  // Handler for CAPTCHA input
  const handleCaptchaChange = (e) => {
    setCaptcha({ ...captcha, input: e.target.value });
    if (captchaError) setCaptchaError('');
  };
  
  // Handler for OTP input
  const handleOtpChange = (e) => {
    setOtp(e.target.value);
    if (otpError) setOtpError('');
  };

  const validateForm = (step) => {
    const newErrors = {};

    // Fields required for any step
    if (!form.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = "Email is invalid";
    
    // NOTE: Frontend CAPTCHA validation is REMOVED here. 
    // The backend is responsible for validation against the stored ID/code.
    
    if (step === 'full') {
        // Validation for full form submission (after OTP)
        if (!form.directCallingNumber.trim()) newErrors.directCallingNumber = "Direct calling number is required";
        if (!form.whatsappNumber.trim()) newErrors.whatsappNumber = "WhatsApp number is required";
        if (!form.gender) newErrors.gender = "Gender is required";
        if (!form.dateOfBirth) newErrors.dateOfBirth = "Date of birth is required";
        if (!form.purposeOfContact) newErrors.purposeOfContact = "Purpose of contact is required";
        if (!form.message.trim()) newErrors.message = "Message is required";
        if (!form.agreeToTerms) newErrors.agreeToTerms = "You must agree to the terms and conditions";
        // Client-side quick check, though backend is the source of truth
        if (!captcha.input.trim()) newErrors.captcha = "CAPTCHA code is required";
    }

    setErrors(newErrors);
    // Note: The `validateForm('email-only')` call in handleSendOtp should be updated 
    // to check for 'fullName' and 'email' specifically, as 'email-only' is not fully implemented here.
    return Object.keys(newErrors).length === 0; 
  };
  
  // --- OTP Logic (Unchanged) ---
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
  
  // --- Final Form Submission Logic (UPDATED) ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // 1. Final Form Validation
    if (!validateForm('full')) {
      // Display client-side CAPTCHA error if input is empty
      if (!captcha.input.trim()) setCaptchaError("CAPTCHA code is required.");
      return;
    }
    
    // 2. Email Verification Check
    if (!isEmailVerified) {
        alert("Please verify your email address with the OTP before submitting the form.");
        return;
    }

    setIsSubmitting(true);
    
    // 3. Prepare Submission Data (UPDATED to include CAPTCHA details)
    const submissionData = {
        ...form,
        purpose: form.purposeOfContact, // Backend expects 'purpose'
        userCaptchaAnswer: captcha.input, // User's CAPTCHA input
        captchaId: captcha.id, // The unique ID for backend verification
    };

    // Clean up unnecessary fields for the database submission if needed
    delete submissionData.purposeOfContact;
    delete submissionData.directCallingNumber; // Assuming the backend `submitContactForm` only takes the required fields
    delete submissionData.whatsappNumber;
    // ... delete other fields not strictly stored in your contact model if necessary

    try {
      // Send data to backend, which will verify CAPTCHA first (using middleware)
      const response = await axios.post(`${API_BASE_URL}/submit`, submissionData);
      
      if (response.data.success) {
          alert("Thank you for your message! We'll get back to you soon.");
          
          // Reset form and states
          setForm(initialFormState);
          setOtp('');
          setIsEmailVerified(false);
          setIsOtpSent(false);
          setErrors({});
          setOtpError('');
          // After submission, fetch a NEW captcha
          fetchCaptcha(); 
      } else {
          alert(response.data.message || "There was an error submitting the form. Please try again.");
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
  
  // Helper to render CAPTCHA (UPDATED JSX)
  const renderCaptcha = () => {
    return (
      <div className="captcha-section">
        <div className="captcha-placeholder">
          <div className="captcha-box">
            <p>Enter the code below:</p>
            {/* Display dynamic CAPTCHA code */}
            <div className="captcha-code">{captcha.code || 'Loading...'}</div>
            
            <input 
              type="text" 
              placeholder="Enter CAPTCHA code" 
              value={captcha.input}
              onChange={handleCaptchaChange}
              className={captchaError ? 'error' : ''}
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
        {errors.captcha && <span className="field-error">{errors.captcha}</span>}
      </div>
    );
  };

  return (
    <div className="contact-form-container">
      <div className="container">
        <div className="section-header">
          <h2>Contact Us</h2>
          <p>Get in touch with us for any inquiries, bookings, or support</p>
        </div>

        <div className="contact-form-wrapper">
          <form onSubmit={handleSubmit} className="contact-form">
            
            {/* Personal Information Section */}
            <div className="form-section">
              <h3>Personal Information</h3>
              <div className="form-grid">
                
                {/* Full Name */}
                <div className="form-group">
                  <label>
                    <span className="input-icon user"></span>
                    Full Name *
                    <input
                      type="text"
                      name="fullName"
                      value={form.fullName}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      className={errors.fullName ? 'error' : ''}
                    />
                    {errors.fullName && <span className="field-error">{errors.fullName}</span>}
                  </label>
                </div>

                {/* Email Address & OTP Verification */}
                <div className="form-group email-verification-group">
                  <label>
                    <span className="input-icon email"></span>
                    Email Address *
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="your.email@example.com"
                      className={errors.email ? 'error' : ''}
                      disabled={isEmailVerified || isOtpSent} // Prevent changing email once OTP is sent
                    />
                    {errors.email && <span className="field-error">{errors.email}</span>}
                  </label>
                  {renderEmailVerification()}
                </div>
                
                {/* Direct Calling Number */}
                <div className="form-group">
                  <label>
                    <span className="input-icon phone"></span>
                    Direct Calling Number *
                    <input
                      type="tel"
                      name="directCallingNumber"
                      value={form.directCallingNumber}
                      onChange={handleChange}
                      placeholder="+971 50 123 4567"
                      className={errors.directCallingNumber ? 'error' : ''}
                    />
                    {errors.directCallingNumber && <span className="field-error">{errors.directCallingNumber}</span>}
                  </label>
                </div>

                {/* WhatsApp Number */}
                <div className="form-group">
                  <label>
                    <span className="input-icon whatsapp"></span>
                    WhatsApp Number *
                    <input
                      type="tel"
                      name="whatsappNumber"
                      value={form.whatsappNumber}
                      onChange={handleChange}
                      placeholder="+971 50 123 4567"
                      className={errors.whatsappNumber ? 'error' : ''}
                    />
                    {errors.whatsappNumber && <span className="field-error">{errors.whatsappNumber}</span>}
                  </label>
                </div>
              </div>
            </div>

            {/* Social Media Section - (Optional Fields) */}
            <div className="form-section">
              <h3>Social Media Profiles</h3>
              <div className="form-grid">
                <div className="form-group">
                  <label>
                    <span className="input-icon instagram"></span> Instagram URL
                    <input type="url" name="instagramUrl" value={form.instagramUrl} onChange={handleChange} placeholder="https://instagram.com/username" />
                  </label>
                </div>
                <div className="form-group">
                  <label>
                    <span className="input-icon tiktok"></span> TikTok URL
                    <input type="url" name="tiktokUrl" value={form.tiktokUrl} onChange={handleChange} placeholder="https://tiktok.com/@username" />
                  </label>
                </div>
                <div className="form-group">
                  <label>
                    <span className="input-icon facebook"></span> Facebook URL
                    <input type="url" name="facebookUrl" value={form.facebookUrl} onChange={handleChange} placeholder="https://facebook.com/username" />
                  </label>
                </div>
              </div>
            </div>

            {/* Demographic Information */}
            <div className="form-section">
              <h3>Demographic Information</h3>
              <div className="form-grid">
                
                {/* Gender */}
                <div className="form-group">
                  <label>
                    Gender *
                    <select name="gender" value={form.gender} onChange={handleChange} className={errors.gender ? 'error' : ''}>
                      <option value="">Select gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                      <option value="prefer-not-to-say">Prefer not to say</option>
                    </select>
                    {errors.gender && <span className="field-error">{errors.gender}</span>}
                  </label>
                </div>

                {/* Date of Birth */}
                <div className="form-group">
                  <label>
                    Date of Birth *
                    <input
                      type="date"
                      name="dateOfBirth"
                      value={form.dateOfBirth}
                      onChange={handleChange}
                      className={errors.dateOfBirth ? 'error' : ''}
                    />
                    {errors.dateOfBirth && <span className="field-error">{errors.dateOfBirth}</span>}
                  </label>
                </div>

                {/* Relationship Status */}
                <div className="form-group">
                  <label>
                    Relationship Status
                    <select name="relationshipStatus" value={form.relationshipStatus} onChange={handleChange}>
                      <option value="">Select status</option>
                      <option value="single">Single</option>
                      <option value="married">Married</option>
                      <option value="fiance">Fiancé</option>
                      <option value="in-relationship">In Relationship</option>
                    </select>
                  </label>
                </div>

                {/* Sexual Orientation */}
                <div className="form-group">
                  <label>
                    Sexual Orientation
                    <select name="sexualOrientation" value={form.sexualOrientation} onChange={handleChange}>
                      <option value="">Select orientation</option>
                      <option value="straight">Straight</option>
                      <option value="gay">Gay</option>
                      <option value="bi">Bi</option>
                      <option value="other">Other</option>
                      <option value="prefer-not-to-say">Prefer not to say</option>
                    </select>
                  </label>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="form-section">
              <h3>Contact Details</h3>
              <div className="form-grid">
                
                {/* Hear About Us */}
                <div className="form-group">
                  <label>
                    How did you hear about us?
                    <select name="hearAboutUs" value={form.hearAboutUs} onChange={handleChange}>
                      <option value="">Select option</option>
                      <option value="friend">Friend</option>
                      <option value="social-media">Social Media</option>
                      <option value="google-search">Google Search</option>
                      <option value="event">Event</option>
                      <option value="advertisement">Advertisement</option>
                      <option value="other">Other</option>
                    </select>
                  </label>
                </div>

                {/* Purpose of Contact */}
                <div className="form-group">
                  <label>
                    Purpose of Contact *
                    <select name="purposeOfContact" value={form.purposeOfContact} onChange={handleChange} className={errors.purposeOfContact ? 'error' : ''}>
                      <option value="">Select purpose</option>
                      <option value="guest-list">Guest List</option>
                      <option value="venue-registration">Venue Registration</option>
                      <option value="table-booking">Table Booking</option>
                      <option value="website-error">Website Error</option>
                      <option value="partnership">Partnership</option>
                      <option value="general-inquiry">General Inquiry</option>
                      <option value="complaint">Complaint</option>
                      <option value="other">Other</option>
                    </select>
                    {errors.purposeOfContact && <span className="field-error">{errors.purposeOfContact}</span>}
                  </label>
                </div>
              </div>
            </div>

            {/* Message Section */}
            <div className="form-section">
              <h3>Your Message</h3>
              <div className="form-group full-width">
                <label>
                  Message *
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Please provide details about your inquiry..."
                    rows="6"
                    className={errors.message ? 'error' : ''}
                  ></textarea>
                  {errors.message && <span className="field-error">{errors.message}</span>}
                </label>
              </div>
            </div>

            {/* CAPTCHA & Terms */}
            <div className="form-section">
              
              {/* CAPTCHA - RENDERED HERE */}
              {renderCaptcha()}

              {/* Terms and Conditions */}
              <div className="terms-section">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="agreeToTerms"
                    checked={form.agreeToTerms}
                    onChange={handleChange}
                    className={errors.agreeToTerms ? 'error' : ''}
                  />
                  <span>I agree to the <a href="/terms" target="_blank">Terms & Conditions</a> and <a href="/privacy" target="_blank">Privacy Policy</a> *</span>
                </label>
                {errors.agreeToTerms && <span className="field-error">{errors.agreeToTerms}</span>}
              </div>
            </div>

            {/* Submit Button */}
            <div className="form-actions">
              <button 
                type="submit" 
                className="submit-btn"
                // Disable button until email is verified
                disabled={isSubmitting || !isEmailVerified} 
              >
                {isSubmitting ? 'Submitting...' : 'Send Message'}
              </button>
            </div>
            
            {!isEmailVerified && (
                <p className="verification-reminder">Please verify your email address before sending the message.</p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;