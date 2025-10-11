import React, { useState } from "react";
import "./Forms.css";

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
    try {
      console.log('DJ Form submitted:', form);
      alert("DJ application submitted successfully! We'll review your profile.");
      setForm({
        djName: "", realName: "", email: "", phone: "", whatsapp: "",
        instagram: "", soundcloud: "", mixcloud: "", youtube: "", genre: "",
        experience: "", equipment: "", pastEvents: "", availability: "",
        feeExpectation: "", message: "", agreeToTerms: false
      });
    } catch (error) {
      alert("Error submitting form. Please try again.");
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
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
  );
};

export default DJPartyForm;