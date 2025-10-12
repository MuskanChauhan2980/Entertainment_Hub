 // components/Navbar.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FaInstagram,
  FaFacebook,
  FaLinkedin,
  FaYoutube,
  FaTwitter,
  FaEnvelope,
  FaPhone,
  FaUserAlt,
  FaUtensils,
  FaCalendarAlt,
  FaCrown,
} from "react-icons/fa";
import "./Navbar.css";

const Navbar = ({ showHero = false }) => {
  const navigate = useNavigate();

   const isPremium = localStorage.getItem("isPremium") === "true";

  return (
    <>
      {/* Top Bar */}
      <div className="top-bar">
        <div className="container">
          <div className="social-icons">
            <a
              href="https://www.instagram.com/yourpage"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram />
            </a>
            <a
              href="https://www.facebook.com/yourpage"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook />
            </a>
            <a
              href="https://www.linkedin.com/in/yourprofile"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://www.youtube.com/@yourchannel"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaYoutube />
            </a>
            <a
              href="https://twitter.com/yourhandle"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter />
            </a>
          </div>

          <div className="contact-info">
            <span>
              <a href="mailto:info@entertainmenthub.com">
                <FaEnvelope /> info@entertainmenthub.com
              </a>
            </span>
            <span>
              <a href="tel:+1234567890">
                <FaPhone /> +1234567890
              </a>
            </span>
          </div>

          
           
        </div>
      </div>

      {/* Header */}
      <header className="main-header">
        <div className="container">
          <div className="logo" onClick={() => navigate("/")}>
            <h1>🎭 EntertainmentHub</h1>
          </div>
          <nav className="main-nav">
            <button className="auth-button" onClick={() => navigate("/signup")}>
              <FaUserAlt />
              Signup / Login
            </button>

            <details className="dropdown">
              <summary className="dropbtn">
                <FaUtensils />
                Venues ▾
              </summary>
              <div className="dropdown-content">
                <a href="/restaurants">Restaurants</a>
                <a href="/venues">Beach Clubs</a>
                <a href="/venues">Night Clubs</a>
                <a href="/venues">Lounges</a>
                <a href="/venues">Pools</a>
                <a href="/venues">Private Clubs</a>
              </div>
            </details>

            <details className="dropdown">
              <summary className="dropbtn">
                <FaCalendarAlt />
                Events ▾
              </summary>
               <div className="dropdown-content">
                <a href="/event">DJ Parties</a>
                <a href="/event">Concerts</a>
                <a href="/event">Music Festivals</a>
                <a href="/event">Special Events</a>
              </div>
            </details>

            <details className="dropdown">
              <summary className="dropbtn">
                <FaUserAlt />
                People ▾
              </summary>
              <div className="dropdown-content">
               
                <a href="/models">DJs</a>
                <a href="/models">Chefs</a>
                <a href="/models">Promoters</a>
                <a href="/models">Influencers</a>
                <a href="/models">Models</a>
              
              </div>
            </details>

            <div>
               {!isPremium && (
                               <button className="cta-premium" onClick={() => navigate("/premiumDetails")}>
                                 Go Premium 
                               </button>
                             )}
                             {isPremium && <button><FaCrown /></button>}
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section - Only show if prop is true */}
      {showHero && (
        <section className="hero">
          <div className="hero-cta">
            <button
              className="cta-primary"
              onClick={() => navigate("/event")}
            >
              Explore Events
            </button>
            <button
              className="cta-secondary"
              onClick={() => navigate("/venues")}
            >
              Discover Venues
            </button>
            <button
              className="cta-premium"
              onClick={() => navigate("/premiumDetails")}
            >
              <FaCrown />
              Go Premium
            </button>
          </div>
          <div className="hero-gradient"></div>
        </section>
      )}
    </>
  );
};

export default Navbar;