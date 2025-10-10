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

const CardGrid = ({ items ,onClick }) => (
  <div className="grid">
    {items.map((item, index) => (
      <div className="card" key={index} onClick={() => onClick(item)}>
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
  const navigate = useNavigate()
  return (
    <div className="App">
      {/* ✅ Top Bar: Social media + Contact Info */}
      <div className="top-bar1">
  <div className="social-icons">
    <a href="https://www.instagram.com/yourpage" target="_blank" rel="noopener noreferrer">
      <FaInstagram />
    </a>
    <a href="https://www.facebook.com/yourpage" target="_blank" rel="noopener noreferrer">
      <FaFacebook />
    </a>
    <a href="https://www.linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer">
      <FaLinkedin />
    </a>
    <a href="https://www.youtube.com/@yourchannel" target="_blank" rel="noopener noreferrer">
      <FaYoutube />
    </a>
    <a href="https://twitter.com/yourhandle" target="_blank" rel="noopener noreferrer">
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
    <span>
      <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer">
        <FaWhatsapp /> WhatsApp
      </a>
    </span>
    <span>
      <a href="https://t.me/yourtelegramhandle" target="_blank" rel="noopener noreferrer">
        <FaTelegramPlane /> Telegram
      </a>
    </span>
  </div>
</div>


      {/* Header */}
      <header>
        <h1>Entertainment Hub</h1>
        <nav>
          <button className="button" onClick={()=>{navigate('/signup')}}>Signup / Login</button>

          <div className="dropdown">
            <button className="dropbtn">Venues ▾</button>
            <div className="dropdown-content">
              <a href="/restaurants">Restaurants</a>
              <a href="/">Beach Clubs</a>
              <a href="/event">Night Clubs</a>
              <a href="/event">Lounges</a>
              <a href="/event">Pools</a>
              <a href="/event">Private Clubs</a>
            </div>
          </div>

          <div className="dropdown">
            <button className="dropbtn">Events ▾</button>
            <div className="dropdown-content">
              <a href="/event">DJ Parties</a>
              <a href="/event">Concerts</a>
              <a href="/event">Music Festivals</a>
              <a href="/event">Special Events</a>
            </div>
          </div>

          <div className="dropdown">
            <button className="dropbtn">People ▾</button>
            <div className="dropdown-content">
              <a href="/featuredPeople">DJs</a>
              <a href="/featuredPeople">Chefs</a>
              <a href="/featuredPeople">Promoters</a>
              <a href="/featuredPeople">Influencers</a>
              <a href="/model">Models</a>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <h2>Discover the Best Events & Venues Near You</h2>
        <p>Restaurants • Beach Clubs • Nightlife • Music Festivals • Parties</p>

        <div className="hero-cta">
        <button onClick={() => navigate('/event')}>Explore Events</button>

          <button onClick={()=> navigate('/venues')}>Explore Venues</button>
          <button onClick={()=>navigate('/premiumDetails')}>Apply for Premium</button>
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
        <CardGrid onClick={()=>{navigate('/event')}} items={events} />
      </section>

      <section className="section">
        <UpcomingEventsPreview />
      </section>

      <section className="section">
        <h3>🏛️ Popular Venues</h3>
        <CardGrid  onClick={()=>{navigate("/venus")}} items={venues} />
      </section>

      <section className="section">
        <h3>👥Models</h3>
        <CardGrid onClick={()=>{navigate('/models')}}  items={people} />
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
              {blogs.slice(0, 2).map((item, index) => (
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
          <button onClick={()=>{navigate('/blog')}}>View All Blog</button>
        </div>

          {/* Articles */}
          <div className="article-group">
            <h4>Articles</h4>
            <div className="blog-article-grid">
              {article.slice(1, 4).map((item, index) => (
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
          <button onClick={()=>{navigate('/article')}}>View All Articles</button>
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
