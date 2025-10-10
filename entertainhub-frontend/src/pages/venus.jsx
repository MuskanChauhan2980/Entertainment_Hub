import React, { useState } from "react";
import "./Venues.css";
import { useNavigate } from "react-router-dom";

const venuesData = [
  {
    id: 1,
    name: "Skyline Lounge",
    category: "nightclub",
    budget: "₹₹₹",
    city: "Mumbai",
    state: "Maharashtra",
    location: "Skyline Lounge, Mumbai, Maharashtra",
    video:
      "https://cdn.media.amplience.net/v/kerzner/roam-home-hero-video/mp4_720p",
    description:
      "An upscale rooftop nightclub with mesmerizing skyline views, signature cocktails, and live DJ sets every weekend.",
    contact: {
      whatsapp: "https://wa.me/919812345678",
      telegram: "https://t.me/skylineclub",
      botim: "https://botim.me/skyline",
    },
    isPremium: false,
  },
  {
    id: 2,
    name: "Bluewater Beach Club",
    category: "beachclub",
    budget: "₹₹",
    city: "Goa",
    state: "Goa",
    location: "Bluewater Beach Club, Goa",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=60",
    description:
      "Experience sun, sand, and sound with live beach parties, global DJs, and luxury cabanas at Goa’s hottest beach club.",
    contact: {
      whatsapp: "https://wa.me/919876543210",
      telegram: "https://t.me/bluewaterclub",
      botim: "https://botim.me/bluewater",
    },
    isPremium: true,
  },
  {
    id: 3,
    name: "The Palace Lounge",
    category: "restaurant",
    budget: "₹₹₹₹",
    city: "Delhi",
    state: "Delhi",
    location: "The Palace Lounge, Delhi",
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=60",
    description:
      "Fine dining meets royal ambience — savor world-class cuisines, exclusive wines, and live instrumental music.",
    contact: {
      whatsapp: "https://wa.me/919812345679",
      telegram: "https://t.me/palacelounge",
      botim: "https://botim.me/palace",
    },
    isPremium: false,
  },
  {
    id: 4,
    name: "Surf Club Goa",
    category: "pool",
    budget: "₹₹",
    city: "Goa",
    state: "Goa",
    location: "Surf Club, Goa",
    video:
      "https://linvite-production.nyc3.cdn.digitaloceanspaces.com/landing-page-site-assets/Member%20Event%20Videos/third-video.mp4",
    description:
      "A vibrant poolside club with tropical vibes, perfect for chill afternoons and sunset parties.",
    contact: {
      whatsapp: "https://wa.me/919876500000",
      telegram: "https://t.me/surfclubgoa",
      botim: "https://botim.me/surf",
    },
    isPremium: true,
  },
];

const Venues = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedCity, setSelectedCity] = useState("all");
  const [selectedBudget, setSelectedBudget] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));

  const categories = [
    { key: "all", label: "All", icon: "fa-bars-staggered" },
    { key: "restaurant", label: "Restaurant", icon: "fa-utensils" },
    { key: "nightclub", label: "Nightclub", icon: "fa-music" },
    { key: "beachclub", label: "Beach Club", icon: "fa-umbrella-beach" },
    { key: "pool", label: "Pool Lounge", icon: "fa-person-swimming" },
  ];

  const cities = ["all", "Mumbai", "Delhi", "Goa"];
  const budgets = ["all", "₹", "₹₹", "₹₹₹", "₹₹₹₹"];

  const filteredVenues = venuesData.filter((venue) => {
    if (venue.isPremium && (!user || !user.isPremium)) return false;

    const matchCategory =
      selectedCategory === "all" || venue.category === selectedCategory;
    const matchCity = selectedCity === "all" || venue.city === selectedCity;
    const matchBudget =
      selectedBudget === "all" || venue.budget === selectedBudget;
    const matchSearch = venue.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    return matchCategory && matchCity && matchBudget && matchSearch;
  });

  const handleReadMore = (venue) => {
    if (!user || !user.isSignup) {
      navigate("/signup");
    } else {
      navigate(`/venues/${venue.id}`);
    }
  };

  return (
    <div className="venues-page">
      <h2>🏖️ Explore Venues & Nightlife</h2>
      <p className="subtitle">
        Discover top restaurants, clubs, and lounges near you — where luxury and
        leisure meet.
      </p>

      {/* Filters */}
      <div className="venues-top-nav">
        <div className="filter-group">
          <label>📍 City:</label>
          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
          >
            {cities.map((city) => (
              <option key={city} value={city}>
                {city === "all" ? "All Cities" : city}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label>💰 Budget:</label>
          <select
            value={selectedBudget}
            onChange={(e) => setSelectedBudget(e.target.value)}
          >
            {budgets.map((b) => (
              <option key={b} value={b}>
                {b === "all" ? "All Budgets" : b}
              </option>
            ))}
          </select>
        </div>

        <div className="search-bar">
          <input
            type="text"
            placeholder="🔎 Search venues..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Category Bar */}
      <ul className="venue-category-bar">
        {categories.map((cat) => (
          <li
            key={cat.key}
            className={selectedCategory === cat.key ? "active" : ""}
            onClick={() => setSelectedCategory(cat.key)}
          >
            <i className={`fa-solid ${cat.icon}`}></i> {cat.label}
          </li>
        ))}
      </ul>

      {/* Venues Grid */}
      <div className="venues-grid">
        {filteredVenues.map((venue) => (
          <div key={venue.id} className="venue-card">
            {venue.image ? (
              <img
                src={venue.image}
                alt={venue.name}
                className="venue-img"
                loading="lazy"
              />
            ) : venue.video ? (
              <video
                src={venue.video}
                className="venue-img"
                autoPlay
                muted
                loop
              />
            ) : (
              <div className="no-media">No media available</div>
            )}

            <div className="venue-info">
              <h3>{venue.name}</h3>
              <p>
                📍 {venue.location}
                <br /> 💰 {venue.budget}
              </p>
              <p className="short-desc">
                {venue.description.length > 80
                  ? venue.description.slice(0, 80) + "..."
                  : venue.description}
              </p>
              <div className="venue-btns">
                <button onClick={() => handleReadMore(venue)}>Read More</button>
                <a
                  href={venue.contact.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className="whatsapp"
                >
                  <i className="fa-brands fa-whatsapp"></i>
                </a>
                <a
                  href={venue.contact.telegram}
                  target="_blank"
                  rel="noreferrer"
                  className="telegram"
                >
                  <i className="fa-brands fa-telegram"></i>
                </a>
                <a
                  href={venue.contact.botim}
                  target="_blank"
                  rel="noreferrer"
                  className="botim"
                >
                  <i className="fa-solid fa-phone"></i>
                </a>
              </div>
            </div>
          </div>
        ))}
        {filteredVenues.length === 0 && (
          <p className="no-results">No venues found.</p>
        )}
      </div>
    </div>
  );
};

export default Venues;
