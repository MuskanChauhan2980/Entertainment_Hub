import React, { useState ,useEffect } from "react";
import "./Forms.css";
import Navbar from "../components/Navbar";
import axios  from 'axios';
const API_BASE_URL = "http://localhost:5000/api/djPartysubmission";
const DJPartyForm = () => {
  const [form, setForm] = useState({
    djName: "",
    realName: "",
    email: "",
    phone: "",
    whatsapp: "",
    instagram: "",
    soundcloud: "",
    mixcloud: "",
    youtube: "",
    genre: "",
    experience: "",
    equipment: "",
    pastEvents: "",
    availability: "",
    feeExpectation: "",
    message: "",
    agreeToTerms: false
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  // UPDATED: State for secure CAPTCHA logic
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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === 'checkbox' ? checked : value
    });
    
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
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

  const validateForm = () => {
    const newErrors = {};
    if (!form.djName.trim()) newErrors.djName = "DJ name is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    if (!form.phone.trim()) newErrors.phone = "Phone number is required";
    if (!form.genre) newErrors.genre = "Music genre is required";
    if (!form.experience) newErrors.experience = "Experience level is required";
    if (!form.agreeToTerms) newErrors.agreeToTerms = "You must agree to the terms";
    
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
      console.log('DJ Form submitted:', form);
      alert("DJ application submitted successfully! We'll review your profile.");
      setForm({
        djName: "", realName: "", email: "", phone: "", whatsapp: "",
        instagram: "", soundcloud: "", mixcloud: "", youtube: "", genre: "",
        experience: "", equipment: "", pastEvents: "", availability: "",
        feeExpectation: "", message: "", agreeToTerms: false
      });
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
          <h2>DJ Party Submission</h2>
          <p>Submit your DJ profile to perform at Dubai's hottest venues</p>
        </div>

        <div className="form-wrapper">
          <form onSubmit={handleSubmit} className="custom-form">
            <div className="form-section">
              <h3>DJ Information</h3>
              <div className="form-grid">
                <div className="form-group">
                  <label>
                    <span className="input-icon user"></span>
                    DJ Name *
                    <input type="text" name="djName" value={form.djName} onChange={handleChange}
                      placeholder="Your stage name" className={errors.djName ? 'error' : ''} />
                    {errors.djName && <span className="field-error">{errors.djName}</span>}
                  </label>
                </div>
                <div className="form-group">
                  <label>
                    <span className="input-icon user"></span>
                    Real Name
                    <input type="text" name="realName" value={form.realName} onChange={handleChange}
                      placeholder="Your legal name" />
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
                </div>
                <div className="form-group">
                  <label>
                    <span className="input-icon phone"></span>
                    Phone Number *
                    <input type="tel" name="phone" value={form.phone} onChange={handleChange}
                      className={errors.phone ? 'error' : ''} />
                    {errors.phone && <span className="field-error">{errors.phone}</span>}
                  </label>
                  {renderEmailVerification()}
                </div>
              </div>
            </div>

            <div className="form-section">
              <h3>Social Media & Music Platforms</h3>
              <div className="form-grid">
                <div className="form-group">
                  <label>
                    <span className="input-icon whatsapp"></span>
                    WhatsApp
                    <input type="tel" name="whatsapp" value={form.whatsapp} onChange={handleChange} />
                  </label>
                </div>
                <div className="form-group">
                  <label>
                    <span className="input-icon instagram"></span>
                    Instagram
                    <input type="url" name="instagram" value={form.instagram} onChange={handleChange} />
                  </label>
                </div>
                <div className="form-group">
                  <label>
                    <span className="input-icon soundcloud"></span>
                    SoundCloud
                    <input type="url" name="soundcloud" value={form.soundcloud} onChange={handleChange} />
                  </label>
                </div>
                <div className="form-group">
                  <label>
                    <span className="input-icon mixcloud"></span>
                    Mixcloud
                    <input type="url" name="mixcloud" value={form.mixcloud} onChange={handleChange} />
                  </label>
                </div>
              </div>
            </div>

            <div className="form-section">
              <h3>DJ Profile</h3>
              <div className="form-grid">
                <div className="form-group">
                  <label>
                    Music Genre *
                    <select name="genre" value={form.genre} onChange={handleChange} className={errors.genre ? 'error' : ''}>
                      <option value="">Select genre</option>
                      <option value="house">House</option>
                      <option value="techno">Techno</option>
                      <option value="tech-house">Tech House</option>
                      <option value="deep-house">Deep House</option>
                      <option value="progressive">Progressive</option>
                      <option value="trance">Trance</option>
                      <option value="drum-bass">Drum & Bass</option>
                      <option value="hip-hop">Hip Hop</option>
                      <option value="r-b">R&B</option>
                      <option value="commercial">Commercial</option>
                      <option value="open-format">Open Format</option>
                    </select>
                    {errors.genre && <span className="field-error">{errors.genre}</span>}
                  </label>
                </div>
                <div className="form-group">
                  <label>
                    Experience Level *
                    <select name="experience" value={form.experience} onChange={handleChange} className={errors.experience ? 'error' : ''}>
                      <option value="">Select experience</option>
                      <option value="beginner">Beginner (0-1 years)</option>
                      <option value="intermediate">Intermediate (1-3 years)</option>
                      <option value="experienced">Experienced (3-5 years)</option>
                      <option value="professional">Professional (5+ years)</option>
                    </select>
                    {errors.experience && <span className="field-error">{errors.experience}</span>}
                  </label>
                </div>
                <div className="form-group">
                  <label>
                    Own Equipment?
                    <select name="equipment" value={form.equipment} onChange={handleChange}>
                      <option value="">Select option</option>
                      <option value="cdj-setup">CDJ Setup</option>
                      <option value="controller">DJ Controller</option>
                      <option value="laptop-only">Laptop Only</option>
                      <option value="none">No Equipment</option>
                    </select>
                  </label>
                </div>
                <div className="form-group">
                  <label>
                    Fee Expectation (AED)
                    <input type="text" name="feeExpectation" value={form.feeExpectation} onChange={handleChange}
                      placeholder="Expected fee per hour" />
                  </label>
                </div>
              </div>

              <div className="form-group full-width">
                <label>
                  Past Events & Experience
                  <textarea name="pastEvents" value={form.pastEvents} onChange={handleChange}
                    placeholder="List notable venues or events you've performed at..." rows="3" />
                </label>
              </div>

              <div className="form-group full-width">
                <label>
                  Availability
                  <textarea name="availability" value={form.availability} onChange={handleChange}
                    placeholder="Your typical availability (weekends, weekdays, etc.)..." rows="2" />
                </label>
              </div>

              <div className="form-group full-width">
                <label>
                  Additional Message
                  <textarea name="message" value={form.message} onChange={handleChange}
                    placeholder="Tell us about your style, special skills, or anything else..." rows="4" />
                </label>
              </div>
            </div>

            <div className="form-section">

                {/* CAPTCHA - RENDERED HERE */}
              {renderCaptcha()}

              <div className="terms-section">
                <label className="checkbox-label">
                  <input type="checkbox" name="agreeToTerms" checked={form.agreeToTerms} onChange={handleChange}
                    className={errors.agreeToTerms ? 'error' : ''} />
                  <span>I agree to the <a href="/terms" target="_blank">Terms & Conditions</a> *</span>
                </label>
                {errors.agreeToTerms && <span className="field-error">{errors.agreeToTerms}</span>}
              </div>
            </div>

            <div className="form-actions">
              <button type="submit" className="submit-btn" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Submit DJ Application'}
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

export default DJPartyForm;