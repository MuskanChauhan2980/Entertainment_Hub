 import React, { useState } from "react";
import "./ApplyGuestlist.css";

const ApplyGuestlist = () => {
  // State for form fields for simple UI validation
  const [form, setForm] = useState({
    fullName: "",
    whatsapp: "",
    instagram: "",
    gender: "",
    nationality: ""
  });
  const [error, setError] = useState("");

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = e => {
    e.preventDefault();
    // Simple UI validation
    if (!form.fullName || !form.whatsapp || !form.gender || !form.nationality)
      return setError("Please fill all required fields.");
    alert("Applied successfully!"); // Replace with actual submit logic
  };

  // Responsive navigation (optional)
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="apply-guestlist">
      {/* ===== HEADER ===== */}
      <header className="header">
        <div className="container header-container">
          <a href="/" className="logo">
            <img src="/lovable-uploads/e81273cb-860b-4af2-a337-bbb468a2c3fe.png" alt="Peak of Dubai Logo" />
            <span className="logo-text">PEAK OF DUBAI</span>
          </a>
          <nav className={`nav ${menuOpen ? "open" : ""}`}>
            <a href="/">Home</a>
            <a href="/apply-guestlist" className="active">Apply Guestlist</a>
          </nav>
          <button className="mobile-menu-btn" onClick={() => setMenuOpen(!menuOpen)}>
            <svg xmlns="http://www.w3.org/2000/svg" className="menu-icon" viewBox="0 0 24 24" stroke="currentColor">
              <line x1="4" y1="6" x2="20" y2="6" />
              <line x1="4" y1="12" x2="20" y2="12" />
              <line x1="4" y1="18" x2="20" y2="18" />
            </svg>
          </button>
        </div>
      </header>

      {/* ===== HERO SECTION ===== */}
      <main>
        <section className="hero">
          <div className="hero-bg">
            <img src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=60" alt="Dubai nightlife party" />
            <div className="overlay-black"></div>
            <div className="overlay-gradient"></div>
          </div>
          <div className="container hero-content">
            <h1>
              Join Our Exclusive <span className="gradient-text">Guestlist</span>
            </h1>
            <p>
              Experience Dubai's most exclusive events with VIP treatment, complimentary drinks, and priority access to the city's hottest venues.
            </p>
          </div>
        </section>

        {/* ===== BENEFITS SECTION ===== */}
        <section className="benefits">
          {/* ...no changes to headings */}
          <div className="container">
            <div className="section-header">
              <h2>Exclusive Benefits</h2>
              <p>
                Join thousands of members who enjoy unparalleled access to Dubai's premier nightlife scene.
              </p>
            </div>
            <div className="benefits-grid">
              {/* For Ladies */}
              <div className="benefit-card">
                <div className="benefit-header ladies">
                  <h3>For Ladies</h3>
                  <p>Premium treatment and exclusive privileges</p>
                </div>
                <div className="benefit-items">
                  <div className="card">
                    <div className="icon crown"></div>
                    <div>
                      <h4>Free Entry</h4>
                      <p>Complimentary access to premium events</p>
                    </div>
                  </div>
                  <div className="card">
                    <div className="icon cocktail"></div>
                    <div>
                      <h4>Free Drinks</h4>
                      <p>Welcome drinks at select venues</p>
                    </div>
                  </div>
                  <div className="card">
                    <div className="icon present"></div>
                    <div>
                      <h4>Birthday Surprises</h4>
                      <p>Exclusive birthday perks & gifts</p>
                    </div>
                  </div>
                </div>
              </div>
              {/* For Gents */}
              <div className="benefit-card">
                <div className="benefit-header gents">
                  <h3>For Gents</h3>
                  <p>Exclusive access and networking opportunities</p>
                </div>
                <div className="benefit-items">
                  <div className="card">
                    <div className="icon network"></div>
                    <div>
                      <h4>Premium Entry</h4>
                      <p>Skip-the-line & priority access</p>
                    </div>
                  </div>
                  <div className="card">
                    <div className="icon handshake"></div>
                    <div>
                      <h4>Meet Influencers</h4>
                      <p>Network with Dubai's elite</p>
                    </div>
                  </div>
                  <div className="card">
                    <div className="icon lounge"></div>
                    <div>
                      <h4>VIP Lounge</h4>
                      <p>Exclusive lounge area access</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="divider"></div>
            {/* Gallery */}
            <div className="gallery">
              <h3>Experience the Lifestyle</h3>
              <div className="gallery-grid">
                {/* Images unchanged */}
                <img src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=60" alt="Party scene" />
                <img src="https://i0.wp.com/thepartyfinder.com/wp-content/uploads/2024/11/The-Rumba-Event.jpg?fit=700%2C338&ssl=1" alt="Club atmosphere" />
                <img src="https://i0.wp.com/thepartyfinder.com/wp-content/uploads/2024/11/Monroe-Nights-Event.jpg?fit=700%2C338&ssl=1" alt="VIP experience" />
                {/* <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=60" alt="Nightlife scene" /> */}
              </div>
            </div>
            <div className="divider"></div>
            {/* Apply Form */}
            <div className="apply-form">
              <h3>Apply Now</h3>
              <p>Fill out the form below to join our exclusive guestlist</p>
              {error && <span className="form-error">{error}</span>}
              <form onSubmit={handleSubmit}>
                <label>
                  <span className="input-icon user"></span>
                  Full Name <input type="text" name="fullName" value={form.fullName} onChange={handleChange} placeholder="Enter your full name" />
                </label>
                <label>
                  <span className="input-icon whatsapp"></span>
                  WhatsApp Number <input type="text" name="whatsapp" value={form.whatsapp} onChange={handleChange} placeholder="+971 50 123 4567" />
                </label>
                <label>
                  <span className="input-icon instagram"></span>
                  Instagram Handle <input type="text" name="instagram" value={form.instagram} onChange={handleChange} placeholder="username" />
                </label>
                <div className="gender">
                  <span>Gender *</span>
                  <label>
                    <input type="radio" name="gender" value="male" checked={form.gender === "male"} onChange={handleChange} /> Male
                  </label>
                  <label>
                    <input type="radio" name="gender" value="female" checked={form.gender === "female"} onChange={handleChange} /> Female
                  </label>
                </div>
                <label>
                  Nationality *
                  <select name="nationality" value={form.nationality} onChange={handleChange}>
                    <option value="">Select your nationality</option>
                    <option value="United Arab Emirates">United Arab Emirates</option>
                    <option value="India">India</option>
                    <option value="United States">United States</option>
                    <option value="United Kingdom">United Kingdom</option>
                  </select>
                </label>
                <button type="submit">Apply to Guestlist</button>
              </form>
            </div>
          </div>
        </section>
      </main>

      {/* ===== FOOTER ===== */}
      <footer className="footer">
        <div className="container footer-container">
          <div className="footer-top">
            <div className="brand">
              <img src="/lovable-uploads/e81273cb-860b-4af2-a337-bbb468a2c3fe.png" alt="Palm Logo" />
              <span className="logo-text">PEAK OF DUBAI</span>
              <p>
                Your ultimate Dubai nightlife companion. Discover the hottest
                events, DJs, and venues all in one place.
              </p>
            </div>
            <div className="footer-links">
              <div>
                <h4>Navigation</h4>
                <ul>
                  <li><a href="/">Home</a></li>
                  <li><a href="/apply-guestlist">Apply Guestlist</a></li>
                </ul>
              </div>
              <div>
                <h4>Resources</h4>
                <ul>
                  <li><a href="#">About Us</a></li>
                  <li><a href="#">Contact</a></li>
                  <li><a href="#">FAQ</a></li>
                </ul>
              </div>
              <div>
                <h4>Legal</h4>
                <ul>
                  <li><a href="#">Privacy Policy</a></li>
                  <li><a href="#">Terms of Service</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© 2025 PEAK OF DUBAI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ApplyGuestlist;
