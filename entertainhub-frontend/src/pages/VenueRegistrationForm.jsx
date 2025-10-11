import React, { useState } from "react";
import "./Forms.css";
import Navbar from "../components/Navbar";

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
    try {
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
    } catch (error) {
      alert("Error submitting form. Please try again.");
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
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
