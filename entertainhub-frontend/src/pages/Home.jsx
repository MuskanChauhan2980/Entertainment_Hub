import React from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import UpcomingEventsPreview from "../components/UpcomingEventsPreview.jsx";
import {
  FaInstagram,
  FaFacebook,
  FaLinkedin,
  FaYoutube,
  FaTwitter,
  FaWhatsapp,
  FaTelegramPlane,
  FaPhone,
  FaEnvelope,
  FaSearch,
  FaCrown,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaUserAlt,
  FaUtensils,
} from "react-icons/fa";

const events = [
  {
    img: "https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2?auto=format&fit=crop&w=800&q=60",
    title: "DJ Spectrum Night",
    desc: "Experience electrifying beats under the stars.",
    time: "10 PM - 2 AM",
    location: "Sky Lounge",
    date: "Fri, Dec 15",
  },
  {
    img: "https://images.unsplash.com/photo-1525182008055-f88b95ff7980?auto=format&fit=crop&w=800&q=60",
    title: "Beach Music Festival",
    desc: "Sun, sand, and sounds of summer.",
    time: "4 PM - 11 PM",
    location: "Sunset Beach",
    date: "Sat, Dec 16",
  },
  {
    img: "https://images.unsplash.com/photo-1519677100203-a0e668c92439?auto=format&fit=crop&w=800&q=60",
    title: "Live Concert Night",
    desc: "Feel the rhythm with the city's top artists.",
    time: "7 PM - 12 AM",
    location: "City Arena",
    date: "Sun, Dec 17",
  },
];

const venues = [
  {
    title: "King Papa Fridays – Papa Club",
    img: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=60",
    desc: "Experience the biggest live concert of the year with your favorite rock bands performing live on stage.",
    type: "Night Club",
    rating: "4.8",
  },
  {
    img: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=800&q=60",
    title: "Wave Night Club",
    desc: "Where every night becomes unforgettable.",
    type: "Lounge",
    rating: "4.6",
  },
  {
    img: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=60",
    desc: "Taste the world! A grand food carnival bringing together chefs and cuisines from around the globe.",
    title: "Bluewater Restaurant",
    type: "Restaurant",
    rating: "4.9",
  },
];

const people = [
  {
    img: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=800&q=60",
    title: "DJ Ayesha",
    desc: "Top electronic DJ across India's nightclubs.",
    premium: true,
    category: "DJ",
  },
  {
    img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=60",
    title: "Chef Lorenzo",
    desc: "Signature dishes from world cuisines.",
    category: "Chef",
  },
  {
    img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=60",
    title: "Promoter Rhea",
    desc: "Bringing unforgettable nightlife experiences.",
    premium: true,
    category: "Promoter",
  },
];

const blogs = [
  {
    img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=60",
    title: "Top 10 Nightclubs in Miami",
    desc: "Explore the best nightlife spots in Miami this season.",
    readTime: "5 min read",
  },
  {
    img: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=800&q=60",
    title: "Best Beach Clubs in Ibiza",
    desc: "Discover stunning beach clubs for summer parties.",
    readTime: "7 min read",
  },
];

const articles = [
  {
    img: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=60",
    title: "Celebrity Chefs You Must Follow",
    desc: "Learn from the world's most famous culinary artists.",
    readTime: "6 min read",
  },
  {
    img: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=800&q=60",
    title: "Mixology Trends 2024",
    desc: "Discover the latest cocktail trends taking over nightlife.",
    readTime: "4 min read",
  },
];

const CardGrid = ({ items, onClick, type = "default" }) => (
  <div className={`grid ${type}-grid`}>
    {items.map((item, index) => (
      <div
        className={`card ${type}-card`}
        key={index}
        onClick={() => onClick(item)}
      >
        <div className="card-image-container">
          <img src={item.img} alt={item.title} />
          {item.premium && (
            <div className="premium-overlay">
              <FaCrown className="premium-icon" />
              <span>Premium</span>
            </div>
          )}
          {item.rating && <div className="rating-badge">⭐ {item.rating}</div>}
        </div>
        <div className="card-content">
          <div className="card-header">
            <h4>{item.title}</h4>
            {item.category && (
              <span className="category-tag">{item.category}</span>
            )}
          </div>
          <p className="card-desc">{item.desc}</p>

          {item.time && (
            <div className="card-meta">
              <div className="meta-item">
                <FaCalendarAlt />
                <span>{item.date}</span>
              </div>
              <div className="meta-item">
                <FaMapMarkerAlt />
                <span>{item.location}</span>
              </div>
              <div className="meta-item">
                <span className="time-badge">{item.time}</span>
              </div>
            </div>
          )}

          {item.type && (
            <div className="venue-type">
              <FaUtensils />
              <span>{item.type}</span>
            </div>
          )}

          {item.readTime && (
            <div className="read-time">
              <span>{item.readTime}</span>
            </div>
          )}
        </div>
      </div>
    ))}
  </div>
);

function Home() {
  const navigate = useNavigate();

  const handleCardClick = (item) => {
    if (
      item.category === "DJ" ||
      item.category === "Chef" ||
      item.category === "Promoter"
    ) {
      navigate("/models");
    } else if (
      item.type === "Beach Clubs" ||
      item.type === "Night Club" ||
      item.type === "Lounge"
    ) {
      navigate("/venues");
    } else if (item.type === "Restaurant") {
      navigate("/restaurants");
    } else {
      navigate("/event");
    }
  };

  const isPremium = localStorage.getItem("isPremium") === "true";

  return (
    <div className="App">
      {/* ✅ Top Bar: Social media + Contact Info */}
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
          <div className="logo">
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
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-text">
            <h2>Discover Unforgettable Experiences</h2>
            <p>
              From electrifying nightlife to exquisite dining - Your next
              adventure starts here
            </p>

            <div className="search-container">
              <div className="search-box">
                <FaSearch className="search-icon" />
                <input
                  type="text"
                  placeholder="Search by location, DJ, venue, cuisine..."
                  className="hero-search"
                />
              </div>
            </div>

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
              {/* <button
                className="cta-premium"
                onClick={() => navigate("/premiumDetails")}
              >
                <FaCrown />
                Go Premium
              </button> */}

              {!isPremium && (
                <button className="cta-premium" onClick={() => navigate("/premiumDetails")}>
                  Go Premium 🌟
                </button>
              )}
              {isPremium && <button><FaCrown /></button>}
            </div>
          </div>
        </div>
        <div className="hero-gradient"></div>
      </section>

      {/* Featured Sections */}
      <section className="section featured-section">
        <div className="container">
          <div className="section-header">
            <h3>🎧 Featured Events</h3>
            <p>Don't miss out on these incredible experiences</p>
          </div>
          <CardGrid onClick={handleCardClick} items={events} type="event" />
        </div>
      </section>

      <section className="section upcoming-section">
        <div className="container">
          <UpcomingEventsPreview />
        </div>
      </section>

      <section className="section venues-section">
        <div className="container">
          <div className="section-header">
            <h3>🏛️ Popular Venues</h3>
            <p>Discover the hottest spots in town</p>
          </div>
          <CardGrid onClick={handleCardClick} items={venues} type="venue" />
        </div>
      </section>

      <section className="section people-section">
        <div className="container">
          <div className="section-header">
            <h3>🌟 Featured Talent</h3>
            <p>Meet the people behind the magic</p>
          </div>
          <CardGrid onClick={handleCardClick} items={people} type="people" />
        </div>
      </section>

      {/* Quick CTA Section */}
      <section className="cta-section">
        <div className="container">
          <h3>Join Our Community</h3>
          <div className="cta-grid">
            <button
              className="cta-card"
              onClick={() => navigate("/djsubmission")}
            >
              <span>🎵</span>
              <div>
                <h4>DJ Party Submission</h4>
                <p>Submit your event</p>
              </div>
            </button>
            <button
              className="cta-card"
              onClick={() => navigate("/VenueRegistrationForm")}
            >
              <span>🏢</span>
              <div>
                <h4>Venue Registration</h4>
                <p>List your venue</p>
              </div>
            </button>
            <button
              className="cta-card"
              onClick={() => navigate("/PromoterForm")}
            >
              <span>📢</span>
              <div>
                <h4>Promoter Form</h4>
                <p>Join our network</p>
              </div>
            </button>
            <button
              className="cta-card"
              onClick={() => navigate("/InfluencerRegistrationForm")}
            >
              <span>👑</span>
              <div>
                <h4>Influencer Registration</h4>
                <p>Collaborate with us</p>
              </div>
            </button>
            <button
              className="cta-card"
              onClick={() => navigate("/GuestlistTableBookingForm")}
            >
              <span>G</span>
              <div>
                <h4>Guest List Registration</h4>
                <p>Book Your seat</p>
              </div>
            </button>
          </div>
        </div>
      </section>

      {/* Latest Blogs & Articles */}
      <section className="section content-section">
        <div className="container">
          <div className="section-header">
            <h3>📰 Latest Content</h3>
            <p>Stay updated with the latest trends and insights</p>
          </div>

          <div className="content-grid">
            <div className="content-column">
              <h4>Featured Blogs</h4>
              <div className="content-cards">
                {blogs.map((blog, index) => (
                  <div className="content-card" key={index}>
                    <img src={blog.img} alt={blog.title} />
                    <div className="content-card-body">
                      <h5>{blog.title}</h5>
                      <p>{blog.desc}</p>
                      <div className="content-meta">
                        <span>{blog.readTime}</span>
                        <button onClick={() => navigate("/blog")}>
                          Read More
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <button
                className="view-all-btn"
                onClick={() => navigate("/blog")}
              >
                View All Blogs
              </button>
            </div>

            <div className="content-column">
              <h4>Latest Articles</h4>
              <div className="content-cards">
                {articles.map((article, index) => (
                  <div className="content-card" key={index}>
                    <img src={article.img} alt={article.title} />
                    <div className="content-card-body">
                      <h5>{article.title}</h5>
                      <p>{article.desc}</p>
                      <div className="content-meta">
                        <span>{article.readTime}</span>
                        <button onClick={() => navigate("/article")}>
                          Read More
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <button
                className="view-all-btn"
                onClick={() => navigate("/article")}
              >
                View All Articles
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="main-footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h4>EntertainmentHub</h4>
              <p>
                Your gateway to unforgettable experiences and premium
                entertainment.
              </p>
              <div className="footer-social">
                <a href="#">
                  <FaInstagram />
                </a>
                <a href="#">
                  <FaFacebook />
                </a>
                <a href="#">
                  <FaTwitter />
                </a>
                <a href="#">
                  <FaYoutube />
                </a>
              </div>
            </div>
            <div className="footer-section">
              <h5>Quick Links</h5>
              <a href="/event">Events</a>
              <a href="/venues">Venues</a>
              <a href="/models">Talent</a>
              <a href="/blog">Blog</a>
            </div>
            <div className="footer-section">
              <h5>Support</h5>
              <a href="#">Contact Us</a>
              <a href="#">Help Center</a>
              <a href="#">Privacy Policy</a>
              <a href="#">Terms & Conditions</a>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© 2025 Entertainment Hub | Designed by Muskan Chauhan</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
