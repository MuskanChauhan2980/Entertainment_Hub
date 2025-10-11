import React, { useState } from "react";
import "./Forms.css";

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
    try {
      console.log('Promoter Form submitted:', form);
      alert("Promoter application submitted! We'll review your profile.");
      setForm({
        fullName: "", email: "", phone: "", whatsapp: "", instagram: "",
        experience: "", networkSize: "", preferredVenues: "", marketingSkills: [],
        availability: "", commissionExpectation: "", references: "", agreeToTerms: false
      });
    } catch (error) {
      alert("Error submitting form. Please try again.");
      console.llog(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
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
  );
};

export default PromoterForm;