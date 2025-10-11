import React, { useState } from "react";
import "./Forms.css";

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
    agreeToTerms: false
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingType, setBookingType] = useState("guestlist"); // "guestlist" or "table"

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
    if (!form.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    if (!form.phone.trim()) newErrors.phone = "Phone number is required";
    if (!form.date) newErrors.date = "Date is required";
    if (!form.guestCount) newErrors.guestCount = "Guest count is required";
    if (bookingType === "table" && !form.budget) newErrors.budget = "Budget is required for table booking";
    if (!form.agreeToTerms) newErrors.agreeToTerms = "You must agree to the terms";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    try {
      console.log('Booking Form submitted:', { ...form, bookingType });
      alert(`Your ${bookingType === 'guestlist' ? 'guestlist' : 'table'} request has been submitted! We'll confirm shortly.`);
      setForm({
        fullName: "", email: "", phone: "", whatsapp: "", instagram: "",
        eventType: "", preferredVenue: "", date: "", guestCount: "",
        tableType: "", budget: "", specialRequests: "", agreeToTerms: false
      });
      setBookingType("guestlist");
    } catch (error) {
      alert("Error submitting booking. Please try again.");
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
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
                  <label className={`booking-option ${bookingType === 'guestlist' ? 'active' : ''}`}>
                    <input
                      type="radio"
                      name="bookingType"
                      value="guestlist"
                      checked={bookingType === 'guestlist'}
                      onChange={() => setBookingType('guestlist')}
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
                  
                  <label className={`booking-option ${bookingType === 'table' ? 'active' : ''}`}>
                    <input
                      type="radio"
                      name="bookingType"
                      value="table"
                      checked={bookingType === 'table'}
                      onChange={() => setBookingType('table')}
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
              <h3>Booking Details</h3>
              <div className="form-grid">
                <div className="form-group">
                  <label>
                    <span className="input-icon instagram"></span>
                    Instagram
                    <input type="text" name="instagram" value={form.instagram} onChange={handleChange}
                      placeholder="@username" />
                  </label>
                </div>
                <div className="form-group">
                  <label>
                    Event Type
                    <select name="eventType" value={form.eventType} onChange={handleChange}>
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
                    <select name="preferredVenue" value={form.preferredVenue} onChange={handleChange}>
                      <option value="">Select venue</option>
                      <option value="white-dubai">White Dubai</option>
                      <option value="base-dubai">BASE Dubai</option>
                      <option value="sbeach-dubai">S Beach</option>
                      <option value="blu-dubai">BLU Dubai</option>
                      <option value="treehouse">Treehouse</option>
                      <option value="iris-dubai">IRIS Dubai</option>
                      <option value="not-sure">Not Sure - Need Recommendations</option>
                    </select>
                  </label>
                </div>
                <div className="form-group">
                  <label>
                    Date *
                    <input type="date" name="date" value={form.date} onChange={handleChange}
                      className={errors.date ? 'error' : ''} />
                    {errors.date && <span className="field-error">{errors.date}</span>}
                  </label>
                </div>
              </div>

              <div className="form-grid">
                <div className="form-group">
                  <label>
                    Number of Guests *
                    <select name="guestCount" value={form.guestCount} onChange={handleChange} className={errors.guestCount ? 'error' : ''}>
                      <option value="">Select guests</option>
                      <option value="1-2">1-2 people</option>
                      <option value="3-5">3-5 people</option>
                      <option value="6-10">6-10 people</option>
                      <option value="11-15">11-15 people</option>
                      <option value="16-20">16-20 people</option>
                      <option value="20+">20+ people</option>
                    </select>
                    {errors.guestCount && <span className="field-error">{errors.guestCount}</span>}
                  </label>
                </div>

                {bookingType === 'table' && (
                  <>
                    <div className="form-group">
                      <label>
                        Table Type
                        <select name="tableType" value={form.tableType} onChange={handleChange}>
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
                        <select name="budget" value={form.budget} onChange={handleChange} className={errors.budget ? 'error' : ''}>
                          <option value="">Select budget</option>
                          <option value="1000-2000">1,000 - 2,000</option>
                          <option value="2000-5000">2,000 - 5,000</option>
                          <option value="5000-10000">5,000 - 10,000</option>
                          <option value="10000-20000">10,000 - 20,000</option>
                          <option value="20000+">20,000+</option>
                        </select>
                        {errors.budget && <span className="field-error">{errors.budget}</span>}
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
                  <textarea name="specialRequests" value={form.specialRequests} onChange={handleChange}
                    placeholder="Any special requirements, celebrations, or preferences..." rows="4" />
                </label>
              </div>
            </div>

            <div className="form-section">
              <div className="terms-section">
                <label className="checkbox-label">
                  <input type="checkbox" name="agreeToTerms" checked={form.agreeToTerms} onChange={handleChange}
                    className={errors.agreeToTerms ? 'error' : ''} />
                  <span>I agree to the <a href="/terms" target="_blank">Booking Terms & Conditions</a> *</span>
                </label>
                {errors.agreeToTerms && <span className="field-error">{errors.agreeToTerms}</span>}
              </div>
            </div>

            <div className="form-actions">
              <button type="submit" className="submit-btn" disabled={isSubmitting}>
                {isSubmitting ? 'Processing...' : `Request ${bookingType === 'guestlist' ? 'Guestlist' : 'Table Booking'}`}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default GuestlistTableBookingForm;