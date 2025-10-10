import React from "react";
import "./Home.css";
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
} from "react-icons/fa";

const events = [
  {
    img: "https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2?auto=format&fit=crop&w=800&q=60",
    title: "DJ Spectrum Night",
    desc: "Experience electrifying beats under the stars.",
    time: "10 PM - 2 AM",
  },
  {
    img: "https://images.unsplash.com/photo-1525182008055-f88b95ff7980?auto=format&fit=crop&w=800&q=60",
    title: "Beach Music Festival",
    desc: "Sun, sand, and sounds of summer.",
    time: "4 PM - 11 PM",
  },
  {
    img: "https://images.unsplash.com/photo-1519677100203-a0e668c92439?auto=format&fit=crop&w=800&q=60",
    title: "Live Concert Night",
    desc: "Feel the rhythm with the city’s top artists.",
    time: "7 PM - 12 AM",
  },
];

const venues = [
 {
    title: "King Papa Fridays – Papa Club",
        img:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=60",
    desc:
      "Experience the biggest live concert of the year with your favorite rock bands performing live on stage.",
  },
  {
    img: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=800&q=60",
    title: "Wave Night Club",
    desc: "Where every night becomes unforgettable.",
  },
  {
    img:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=60",
    desc:
      "Taste the world! A grand food carnival bringing together chefs and cuisines from around the globe.",
    title: "Bluewater Restaurant"
  },
];

const people = [
  {
    img: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=800&q=60",
    title: "DJ Ayesha",
    desc: "Top electronic DJ across India’s nightclubs.",
    premium: true,
  },
  {
    img: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&w=800&q=60",
    title: "Chef Lorenzo",
    desc: "Signature dishes from world cuisines.",
  },
  {
    img: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&w=800&q=60",
    title: "Promoter Rhea",
    desc: "Bringing unforgettable nightlife experiences.",
    premium: true,
  },
];

const blogs = [
  {
    img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=60",
    title: "Top 10 Nightclubs in Miami",
    desc: "Explore the best nightlife spots in Miami this season.",
  },
  {
    img: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=800&q=60",
    title: "Best Beach Clubs in Ibiza",
    desc: "Discover stunning beach clubs for summer parties.",
  },
  {
    img: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=60",
    title: "Celebrity Chefs You Must Follow",
    desc: "Learn from the world’s most famous culinary artists.",
  },
];

const article = [
  {
    img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=60",
    title: "Top 10 Nightclubs in Miami",
    desc: "Explore the best nightlife spots in Miami this season.",
  },
  {
    img: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=800&q=60",
    title: "Best Beach Clubs in Ibiza",
    desc: "Discover stunning beach clubs for summer parties.",
  },
  {
    img: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=60",
    title: "Celebrity Chefs You Must Follow",
    desc: "Learn from the world’s most famous culinary artists.",
  },
];

const CardGrid = ({ items }) => (
  <div className="grid">
    {items.map((item, index) => (
      <div className="card" key={index}>
        <img src={item.img} alt={item.title} />
        <div className="card-content">
          <h4>
            {item.title}{" "}
            {item.premium && <span className="premium-badge">Premium</span>}
          </h4>
          <p>{item.desc}</p>
          {item.time && <p className="time">{item.time}</p>}
        </div>
      </div>
    ))}
  </div>
);

function Home() {
  return (
    <div className="App">
      {/* ✅ Top Bar: Social media + Contact Info */}
      <div className="top-bar1">
        <div className="social-icons">
          <a href="#">
            <FaInstagram />
          </a>
          <a href="#">
            <FaFacebook />
          </a>
          <a href="#">
            <FaLinkedin />
          </a>
          <a href="#">
            <FaYoutube />
          </a>
          <a href="#">
            <FaTwitter />
          </a>
        </div>

        <div className="contact-info">
          <span>
            <FaEnvelope /> info@entertainmenthub.com
          </span>
          <span>
            <FaPhone /> +1234567890
          </span>
          <span>
            <FaWhatsapp /> WhatsApp
          </span>
          <span>
            <FaTelegramPlane /> Telegram
          </span>
        </div>
      </div>

      {/* Header */}
      <header>
        <h1>Entertainment Hub</h1>
        <nav>
          <button className="button">Signup / Login</button>

          <div className="dropdown">
            <button className="dropbtn">Venues ▾</button>
            <div className="dropdown-content">
              <a href="#">Restaurants</a>
              <a href="#">Beach Clubs</a>
              <a href="#">Night Clubs</a>
              <a href="#">Lounges</a>
              <a href="#">Pools</a>
              <a href="#">Private Clubs</a>
            </div>
          </div>

          <div className="dropdown">
            <button className="dropbtn">Events ▾</button>
            <div className="dropdown-content">
              <a href="#">DJ Parties</a>
              <a href="#">Concerts</a>
              <a href="#">Music Festivals</a>
              <a href="#">Special Events</a>
            </div>
          </div>

          <div className="dropdown">
            <button className="dropbtn">People ▾</button>
            <div className="dropdown-content">
              <a href="#">DJs</a>
              <a href="#">Chefs</a>
              <a href="#">Promoters</a>
              <a href="#">Influencers</a>
              <a href="#">Models</a>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <h2>Discover the Best Events & Venues Near You</h2>
        <p>Restaurants • Beach Clubs • Nightlife • Music Festivals • Parties</p>

        <div className="hero-cta">
          <button>Explore Events</button>
          <button>Explore Venues</button>
          <button>Apply for Premium</button>
        </div>

        <input
          type="text"
          placeholder="Search by location, DJ, venue, cuisine..."
          className="hero-search"
        />
      </section>

      {/* Featured Sections */}
      <section className="section">
        <h3>🎧 Featured Events</h3>
        <CardGrid items={events} />
      </section>

      <section className="section">
        <UpcomingEventsPreview />
      </section>

      <section className="section">
        <h3>🏛️ Popular Venues</h3>
        <CardGrid items={venues} />
      </section>

      <section className="section">
        <h3>👥 Featured People</h3>
        <CardGrid items={people} />
      </section>

      {/* Quick CTA Section */}
      <section className="cta-section">
        <button>DJ Party Submission</button>
        <button>Venue Registration</button>
        <button>Promoter Form</button>
        <button>Influencer Registration</button>
        <button>Guestlist / Table Booking</button>
      </section>

      {/* Latest Blogs */}
      <section className="section">
        <h3>📰 Latest Blogs & Articles</h3>

        <div className="blog-article-section">
          {/* Blogs */}
          <div className="blog-group">
            <h4>Blogs</h4>
            <div className="blog-article-grid">
              {blogs.slice(0, 4).map((item, index) => (
                <div className="card" key={index}>
                  <img src={item.img} alt={item.title} />
                  <div className="card-content">
                    <h4>{item.title}</h4>
                    <p>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="blog-buttons">
          <button>View All Blog</button>
        </div>

          {/* Articles */}
          <div className="article-group">
            <h4>Articles</h4>
            <div className="blog-article-grid">
              {article.slice(0, 4).map((item, index) => (
                <div className="card" key={index}>
                  <img src={item.img} alt={item.title} />
                  <div className="card-content">
                    <h4>{item.title}</h4>
                    <p>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="blog-buttons">
          <button>View All Articles</button>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <p>© 2025 Entertainment Hub | Designed by Muskan Chauhan</p>
        <p>Terms & Conditions | Privacy Policy | Cookie Policy | Contact Us</p>
      </footer>
    </div>
  );
}

export default Home;
