import React, { useState ,useEffect} from "react";
import "./Forms.css";
import Navbar from "../components/Navbar";

import axios from "axios";
const API_BASE_URL = "http://localhost:5000/api/influencerRegistrationForm"; // **CONFIRM YOUR BACKEND URL**


const InfluencerRegistrationForm = () => {
  const [form, setForm] = useState({
    fullName: "",
    influencerName: "",
    email: "",
    phone: "",
    whatsapp: "",
    instagram: "",
    tiktok: "",
    youtube: "",
    facebook: "",
    followers: "",
    engagementRate: "",
    niche: "",
    contentType: [],
    collaborationInterest: [],
    pastCollaborations: "",
    rateExpectation: "",
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

   const handleCaptchaChange = (e) => {
    setCaptcha({ ...captcha, input: e.target.value });
    if (captchaError) setCaptchaError('');
  }; 

    // Handler for OTP input
  const handleOtpChange = (e) => {
    setOtp(e.target.value);
    if (otpError) setOtpError("");
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
    
    if (name === 'agreeToTerms') {
        // Set the value directly to the boolean state of the checkbox
        setForm({ ...form, [name]: checked }); 
    } 
   else if (type === 'checkbox') {
      const currentValues = form[name] || [];
      if (checked) {
        setForm({ ...form, [name]: [...currentValues, value] });
      } else {
        setForm({ ...form, [name]: currentValues.filter(item => item !== value) });
      }
    } else {
      setForm({ ...form, [name]: value });
    }
    
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
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
    if (!form.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    if (!form.phone.trim()) newErrors.phone = "Phone number is required";
    if (!form.instagram.trim()) newErrors.instagram = "Instagram handle is required";
    if (!form.followers) newErrors.followers = "Follower count is required";
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
       const response = await axios.post(
        `${API_BASE_URL}/submit`,
        submissionData
      );

      if (response.data.success) {
      console.log('Influencer Form submitted:', form);
      alert("Influencer registration submitted! We'll review your profile.");
      setForm({
        fullName: "", influencerName: "", email: "", phone: "", whatsapp: "",
        instagram: "", tiktok: "", youtube: "", facebook: "", followers: "",
        engagementRate: "", niche: "", contentType: [], collaborationInterest: [],
        pastCollaborations: "", rateExpectation: "", agreeToTerms: false
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


  return (
     <div className="App">
      <Navbar showHero={false} />
      <section className="section"> 
    <div className="form-container">
      <div className="container">
        <div className="section-header">
          <h2>Influencer Registration</h2>
          <p>Partner with us to promote Dubai's premier nightlife experiences</p>
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
                    <span className="input-icon user"></span>
                    Influencer/Brand Name
                    <input type="text" name="influencerName" value={form.influencerName} onChange={handleChange}
                      placeholder="Your public name" />
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
              </div>
            </div>

            <div className="form-section">
              <h3>Social Media Profiles</h3>
              <div className="form-grid">
                <div className="form-group">
                  <label>
                    <span className="input-icon instagram"></span>
                    Instagram *
                    <input type="text" name="instagram" value={form.instagram} onChange={handleChange}
                      placeholder="@username" className={errors.instagram ? 'error' : ''} />
                    {errors.instagram && <span className="field-error">{errors.instagram}</span>}
                  </label>
                </div>
                <div className="form-group">
                  <label>
                    <span className="input-icon tiktok"></span>
                    TikTok
                    <input type="text" name="tiktok" value={form.tiktok} onChange={handleChange}
                      placeholder="@username" />
                  </label>
                </div>
                <div className="form-group">
                  <label>
                    <span className="input-icon youtube"></span>
                    YouTube
                    <input type="text" name="youtube" value={form.youtube} onChange={handleChange}
                      placeholder="Channel name" />
                  </label>
                </div>
                <div className="form-group">
                  <label>
                    <span className="input-icon facebook"></span>
                    Facebook
                    <input type="text" name="facebook" value={form.facebook} onChange={handleChange}
                      placeholder="Page name" />
                  </label>
                </div>
              </div>
            </div>

            <div className="form-section">
              <h3>Audience & Analytics</h3>
              <div className="form-grid">
                <div className="form-group">
                  <label>
                    Total Followers *
                    <select name="followers" value={form.followers} onChange={handleChange} className={errors.followers ? 'error' : ''}>
                      <option value="">Select range</option>
                      <option value="1k-5k">1K - 5K</option>
                      <option value="5k-10k">5K - 10K</option>
                      <option value="10k-50k">10K - 50K</option>
                      <option value="50k-100k">50K - 100K</option>
                      <option value="100k-500k">100K - 500K</option>
                      <option value="500k-1m">500K - 1M</option>
                      <option value="1m+">1M+</option>
                    </select>
                    {errors.followers && <span className="field-error">{errors.followers}</span>}
                  </label>
                </div>
                <div className="form-group">
                  <label>
                    Engagement Rate
                    <select name="engagementRate" value={form.engagementRate} onChange={handleChange}>
                      <option value="">Select rate</option>
                      <option value="1-3">1-3%</option>
                      <option value="3-5">3-5%</option>
                      <option value="5-7">5-7%</option>
                      <option value="7-10">7-10%</option>
                      <option value="10+">10%+</option>
                    </select>
                  </label>
                </div>
                <div className="form-group">
                  <label>
                    Primary Niche
                    <select name="niche" value={form.niche} onChange={handleChange}>
                      <option value="">Select niche</option>
                      <option value="lifestyle">Lifestyle</option>
                      <option value="fashion">Fashion</option>
                      <option value="travel">Travel</option>
                      <option value="food">Food & Dining</option>
                      <option value="nightlife">Nightlife</option>
                      <option value="luxury">Luxury</option>
                      <option value="fitness">Fitness</option>
                      <option value="beauty">Beauty</option>
                    </select>
                  </label>
                </div>
                <div className="form-group">
                  <label>
                    Rate Expectation (AED)
                    <select name="rateExpectation" value={form.rateExpectation} onChange={handleChange}>
                      <option value="">Select range</option>
                      <option value="500-1000">500 - 1,000</option>
                      <option value="1000-2500">1,000 - 2,500</option>
                      <option value="2500-5000">2,500 - 5,000</option>
                      <option value="5000-10000">5,000 - 10,000</option>
                      <option value="10000+">10,000+</option>
                      <option value="barter">Barter/Exchange</option>
                    </select>
                  </label>
                </div>
              </div>
            </div>

            <div className="form-section">
              <h3>Content & Collaboration</h3>
              <div className="checkbox-group">
                <label>Content Types You Create</label>
                <div className="checkbox-grid">
                  {['Photos', 'Reels/Short Videos', 'Stories', 'IGTV/Long Videos', 'Live Streams', 'Blog Posts', 'Product Reviews', 'Event Coverage', 'Behind Scenes', 'Tutorials'].map(type => (
                    <label key={type} className="checkbox-label">
                      <input type="checkbox" name="contentType" value={type.toLowerCase()} 
                        onChange={handleChange} checked={form.contentType.includes(type.toLowerCase())} />
                      <span>{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="checkbox-group">
                <label>Collaboration Interests</label>
                <div className="checkbox-grid">
                  {['Event Attendance', 'Product Placement', 'Brand Ambassador', 'Social Media Takeover', 'Content Creation', 'Giveaways', 'Paid Partnerships', 'Affiliate Marketing', 'Event Hosting', 'Photo Shoots'].map(collab => (
                    <label key={collab} className="checkbox-label">
                      <input type="checkbox" name="collaborationInterest" value={collab.toLowerCase()} 
                        onChange={handleChange} checked={form.collaborationInterest.includes(collab.toLowerCase())} />
                      <span>{collab}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="form-group full-width">
                <label>
                  Past Collaborations
                  <textarea name="pastCollaborations" value={form.pastCollaborations} onChange={handleChange}
                    placeholder="List notable brands or venues you've worked with..." rows="3" />
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
                  <span>I agree to the <a href="/terms" target="_blank">Influencer Agreement</a> *</span>
                </label>
                {errors.agreeToTerms && <span className="field-error">{errors.agreeToTerms}</span>}
              </div>
            </div>

            <div className="form-actions">
              <button type="submit" className="submit-btn" disabled={isSubmitting}>
                {isSubmitting ? 'Registering...' : 'Register as Influencer'}
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

export default InfluencerRegistrationForm;