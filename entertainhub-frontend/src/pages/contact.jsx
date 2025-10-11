import React, { useState } from "react";
import "./ContactForm.css";

const ContactForm = () => {
  const [form, setForm] = useState({
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
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === 'checkbox' ? checked : value
    });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Required fields validation
    if (!form.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = "Email is invalid";
    
    if (!form.directCallingNumber.trim()) newErrors.directCallingNumber = "Direct calling number is required";
    if (!form.whatsappNumber.trim()) newErrors.whatsappNumber = "WhatsApp number is required";
    if (!form.gender) newErrors.gender = "Gender is required";
    if (!form.dateOfBirth) newErrors.dateOfBirth = "Date of birth is required";
    if (!form.purposeOfContact) newErrors.purposeOfContact = "Purpose of contact is required";
    if (!form.message.trim()) newErrors.message = "Message is required";
    if (!form.agreeToTerms) newErrors.agreeToTerms = "You must agree to the terms and conditions";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    // Simulate form submission
    try {
      // Here you would integrate with your backend
      console.log('Form submitted:', form);
      alert("Thank you for your message! We'll get back to you soon.");
      
      // Reset form
      setForm({
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
      });
    } catch (error) {
      alert("There was an error submitting the form. Please try again.");
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
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

                <div className="form-group">
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
                    />
                    {errors.email && <span className="field-error">{errors.email}</span>}
                  </label>
                </div>

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

            {/* Social Media Section */}
            <div className="form-section">
              <h3>Social Media Profiles</h3>
              <div className="form-grid">
                <div className="form-group">
                  <label>
                    <span className="input-icon instagram"></span>
                    Instagram URL
                    <input
                      type="url"
                      name="instagramUrl"
                      value={form.instagramUrl}
                      onChange={handleChange}
                      placeholder="https://instagram.com/username"
                    />
                  </label>
                </div>

                <div className="form-group">
                  <label>
                    <span className="input-icon tiktok"></span>
                    TikTok URL
                    <input
                      type="url"
                      name="tiktokUrl"
                      value={form.tiktokUrl}
                      onChange={handleChange}
                      placeholder="https://tiktok.com/@username"
                    />
                  </label>
                </div>

                <div className="form-group">
                  <label>
                    <span className="input-icon facebook"></span>
                    Facebook URL
                    <input
                      type="url"
                      name="facebookUrl"
                      value={form.facebookUrl}
                      onChange={handleChange}
                      placeholder="https://facebook.com/username"
                    />
                  </label>
                </div>
              </div>
            </div>

            {/* Demographic Information */}
            <div className="form-section">
              <h3>Demographic Information</h3>
              <div className="form-grid">
                <div className="form-group">
                  <label>
                    Gender *
                    <select
                      name="gender"
                      value={form.gender}
                      onChange={handleChange}
                      className={errors.gender ? 'error' : ''}
                    >
                      <option value="">Select gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                      <option value="prefer-not-to-say">Prefer not to say</option>
                    </select>
                    {errors.gender && <span className="field-error">{errors.gender}</span>}
                  </label>
                </div>

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

                <div className="form-group">
                  <label>
                    Relationship Status
                    <select
                      name="relationshipStatus"
                      value={form.relationshipStatus}
                      onChange={handleChange}
                    >
                      <option value="">Select status</option>
                      <option value="single">Single</option>
                      <option value="married">Married</option>
                      <option value="fiance">Fiancé</option>
                      <option value="in-relationship">In Relationship</option>
                    </select>
                  </label>
                </div>

                <div className="form-group">
                  <label>
                    Sexual Orientation
                    <select
                      name="sexualOrientation"
                      value={form.sexualOrientation}
                      onChange={handleChange}
                    >
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
                <div className="form-group">
                  <label>
                    How did you hear about us?
                    <select
                      name="hearAboutUs"
                      value={form.hearAboutUs}
                      onChange={handleChange}
                    >
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

                <div className="form-group">
                  <label>
                    Purpose of Contact *
                    <select
                      name="purposeOfContact"
                      value={form.purposeOfContact}
                      onChange={handleChange}
                      className={errors.purposeOfContact ? 'error' : ''}
                    >
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
              <div className="captcha-section">
                <div className="captcha-placeholder">
                  {/* Replace with your actual CAPTCHA component */}
                  <div className="captcha-box">
                    <p>CAPTCHA will be implemented here</p>
                    <div className="captcha-code">PEAK2024</div>
                    <input type="text" placeholder="Enter CAPTCHA code" />
                  </div>
                </div>
              </div>

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
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;