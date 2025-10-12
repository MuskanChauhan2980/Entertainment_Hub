import React, { useState ,useEffect } from "react";
import "./forms.css";
import Navbar from "../components/Navbar";

import axios from 'axios'; // Import axios for API calls

const API_BASE_URL = "http://localhost:5000/api/promoterFrom";

const PromoterForm = () => {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    whatsapp: "",
    instagram: "",
    experience: "",
    networkSize: "",
    preferredVenues: "",
    marketingSkills: [],
    availability: "",
    commissionExpectation: "",
    references: "",
    agreeToTerms: false
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [captcha, setCaptcha] = useState({
      code: '', // The visual code (now dynamic)
      id: null, // The unique ID for backend verification
      input: '', // The user's typed answer
    });
    const [captchaError, setCaptchaError] = useState('');

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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      const currentValues = form[name] || [];
      if (checked) {
        setForm({ ...form, [name]: [...currentValues, value] });
      } else {
        setForm({ ...form, [name]: currentValues.filter(item => item !== value) });
      }
    } else if (type === 'radio' || type === 'select-one') {
      setForm({ ...form, [name]: value });
    } else {
      setForm({ ...form, [name]: value });
    }
    
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
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

  const validateForm = () => {
    const newErrors = {};
    if (!form.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    if (!form.phone.trim()) newErrors.phone = "Phone number is required";
    if (!form.experience) newErrors.experience = "Experience level is required";
    if (!form.agreeToTerms) newErrors.agreeToTerms = "You must agree to the terms";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsSubmitting(true);
       // 3. Prepare Submission Data (UPDATED to include CAPTCHA details)
    const submissionData = {
        ...form,
        purpose: form.purposeOfContact, // Backend expects 'purpose'
        userCaptchaAnswer: captcha.input, // User's CAPTCHA input
        captchaId: captcha.id, // The unique ID for backend verification
    };
    try {
      const response = await axios.post(`${API_BASE_URL}/submit`, submissionData);
      
      if (response.data.success) {
          console.log('Promoter Form submitted:', form);
      alert("Promoter application submitted! We'll review your profile.");
      setForm({
        fullName: "", email: "", phone: "", whatsapp: "", instagram: "",
        experience: "", networkSize: "", preferredVenues: "", marketingSkills: [],
        availability: "", commissionExpectation: "", references: "", agreeToTerms: false
      });
      setOtp('');
      setIsEmailVerified(false);
          setIsOtpSent(false);
          setErrors({});
          setOtpError('');
          fetchCaptcha(); 
      }
    }catch (error) {
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
    <div className="App">
      <Navbar showHero={false} />
      <section className="section"> 
    <div className="form-container">
      <div className="container">
        <div className="section-header">
          <h2>Promoter Application</h2>
          <p>Join our team of elite promoters and earn commissions promoting Dubai's hottest events</p>
        </div>

        <div className="form-wrapper">
          <form onSubmit={handleSubmit} className="custom-form">
            <div className="form-section">
              <h3>Personal Information</h3>
              <div className="form-grid">
                <div className="form-group">
                  <label>
                    <span className="input-icon user"></span>
                    Full Name *
                    <input type="text" name="fullName" value={form.fullName} onChange={handleChange}
                      className={errors.fullName ? 'error' : ''} />
                    {errors.fullName && <span className="field-error">{errors.fullName}</span>}
                  </label>
                </div>
                <div className="form-group">
                  <label>
                    <span className="input-icon email"></span>
                    Email *
                    <input type="email" name="email" value={form.email} onChange={handleChange}
                      className={errors.email ? 'error' : ''} />
                    {errors.email && <span className="field-error">{errors.email}</span>}
                  </label>
                  {renderEmailVerification()}
                </div>
                <div className="form-group">
                  <label>
                    <span className="input-icon phone"></span>
                    Phone Number *
                    <input type="tel" name="phone" value={form.phone} onChange={handleChange}
                      className={errors.phone ? 'error' : ''} />
                    {errors.phone && <span className="field-error">{errors.phone}</span>}
                  </label>
                </div>
                <div className="form-group">
                  <label>
                    <span className="input-icon whatsapp"></span>
                    WhatsApp
                    <input type="tel" name="whatsapp" value={form.whatsapp} onChange={handleChange} />
                  </label>
                </div>
              </div>
            </div>

            <div className="form-section">
              <h3>Social Media & Network</h3>
              <div className="form-grid">
                <div className="form-group">
                  <label>
                    <span className="input-icon instagram"></span>
                    Instagram Followers
                    <input type="text" name="instagram" value={form.instagram} onChange={handleChange}
                      placeholder="Number of followers" />
                  </label>
                </div>
                <div className="form-group">
                  <label>
                    Estimated Network Size *
                    <select name="networkSize" value={form.networkSize} onChange={handleChange}>
                      <option value="">Select size</option>
                      <option value="50-100">50-100 people</option>
                      <option value="100-500">100-500 people</option>
                      <option value="500-1000">500-1000 people</option>
                      <option value="1000-5000">1000-5000 people</option>
                      <option value="5000+">5000+ people</option>
                    </select>
                  </label>
                </div>
                <div className="form-group">
                  <label>
                    Promotion Experience *
                    <select name="experience" value={form.experience} onChange={handleChange} className={errors.experience ? 'error' : ''}>
                      <option value="">Select experience</option>
                      <option value="none">No experience</option>
                      <option value="0-1">0-1 years</option>
                      <option value="1-3">1-3 years</option>
                      <option value="3-5">3-5 years</option>
                      <option value="5+">5+ years</option>
                    </select>
                    {errors.experience && <span className="field-error">{errors.experience}</span>}
                  </label>
                </div>
                <div className="form-group">
                  <label>
                    Commission Expectation
                    <select name="commissionExpectation" value={form.commissionExpectation} onChange={handleChange}>
                      <option value="">Select expectation</option>
                      <option value="10-15">10-15%</option>
                      <option value="15-20">15-20%</option>
                      <option value="20-25">20-25%</option>
                      <option value="25-30">25-30%</option>
                      <option value="negotiable">Negotiable</option>
                    </select>
                  </label>
                </div>
              </div>
            </div>

            <div className="form-section">
              <h3>Marketing Skills</h3>
              <div className="checkbox-group">
                <label>Select your marketing strengths</label>
                <div className="checkbox-grid">
                  {['Social Media Marketing', 'WhatsApp Groups', 'Telegram Channels', 'Flyer Distribution', 'Street Team', 'Influencer Outreach', 'Email Marketing', 'Event Photography', 'Video Content', 'PR Relationships'].map(skill => (
                    <label key={skill} className="checkbox-label">
                      <input type="checkbox" name="marketingSkills" value={skill.toLowerCase()} 
                        onChange={handleChange} checked={form.marketingSkills.includes(skill.toLowerCase())} />
                      <span>{skill}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="form-section">
              <h3>Venue & Availability</h3>
              <div className="form-group full-width">
                <label>
                  Preferred Venues to Promote
                  <textarea name="preferredVenues" value={form.preferredVenues} onChange={handleChange}
                    placeholder="Which venues or areas do you prefer to work with?" rows="3" />
                </label>
              </div>
              <div className="form-group full-width">
                <label>
                  Availability
                  <textarea name="availability" value={form.availability} onChange={handleChange}
                    placeholder="Your availability for promotion activities..." rows="2" />
                </label>
              </div>
              <div className="form-group full-width">
                <label>
                  References or Past Work
                  <textarea name="references" value={form.references} onChange={handleChange}
                    placeholder="Any references or past promotion experience..." rows="3" />
                </label>
              </div>
            </div>

            <div className="form-section">

               {/* CAPTCHA - RENDERED HERE */}
              {renderCaptcha()}

               {/* Terms and Conditions */}
              <div className="terms-section">
                <label className="checkbox-label">
                  <input type="checkbox" name="agreeToTerms" checked={form.agreeToTerms} onChange={handleChange}
                    className={errors.agreeToTerms ? 'error' : ''} />
                  <span>I agree to the <a href="/terms" target="_blank">Promoter Agreement</a> *</span>
                </label>
                {errors.agreeToTerms && <span className="field-error">{errors.agreeToTerms}</span>}
              </div>
            </div>

            <div className="form-actions">
              <button type="submit" className="submit-btn" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Apply as Promoter'}
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

export default PromoterForm;