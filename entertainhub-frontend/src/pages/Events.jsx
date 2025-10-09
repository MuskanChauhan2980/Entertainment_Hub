import React, { useState } from "react";
import "./Events.css";
import { useNavigate } from "react-router-dom";

const eventsData = [
  {
    id: 1,
    title: "DJ Spectrum Night",
    date: "2025-10-12",
    location: "Skyline Lounge, Mumbai, Maharashtra",
    city: "Mumbai",
    state: "Maharashtra",
    category: "restaurant",
    video:
      "https://cdn.media.amplience.net/v/kerzner/roam-home-hero-video/mp4_720p",
    description:
      "An electrifying night with top DJs spinning the hottest tracks. Come and dance the night away at Skyline Lounge.",
  },
  {
    id: 2,
    title: "Beach Music Festival",
    date: "2025-10-18",
    location: "Bluewater Beach, Goa, Goa",
    city: "Goa",
    state: "Goa",
    category: "persian-arabic",
    image:
      "https://images.unsplash.com/photo-1519677100203-a0e668c92439?auto=format&fit=crop&w=800&q=60",
    description:
      "Enjoy the rhythm of waves and music! A two-day beach festival featuring live bands, DJs, and food stalls.",
  },
  {
    id: 3,
    title: "Live Concert Night",
    date: "2025-11-01",
    location: "City Arena, Delhi, Delhi",
    city: "Delhi",
    state: "Delhi",
    category: "persian-arabic",
    image:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=60",
    description:
      "Experience the biggest live concert of the year with your favorite rock bands performing live on stage.",
  },
  {
    id: 4,
    title: "Gourmet Food Carnival",
    date: "2025-11-15",
    location: "Downtown Plaza, Bangalore, Karnataka",
    city: "Bangalore",
    state: "Karnataka",
    category: "restaurant",
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=60",
    description:
      "Taste the world! A grand food carnival bringing together chefs and cuisines from around the globe.",
  },
  {
    id: 5,
    title: "Dream Dinner Show – Dream Restaurant",
    category: "restaurant",
    image:
      "https://i0.wp.com/thepartyfinder.com/wp-content/uploads/2024/11/Dream-Event.jpg?fit=700%2C338&ssl=1",
    location: "Dream Restaurant, Mumbai, Maharashtra",
    city: "Mumbai",
    state: "Maharashtra",
    time: "Wed–Sun 8 PM - 3 AM",
  },
  {
    id: 6,
    title: "King Papa Fridays – Papa Club",
    category: "nightclub",
    video:
      "https://linvite-production.nyc3.cdn.digitaloceanspaces.com/landing-page-site-assets/Member%20Event%20Videos/third-video.mp4",
    location: "Papa Club, Delhi, Delhi",
    city: "Delhi",
    state: "Delhi",
    time: "Friday 11 PM - 4 AM",
  },
  {
    id: 7,
    title: "Summer Reunion – Surf Club",
    category: "beachclub",
    image:
      "https://i0.wp.com/thepartyfinder.com/wp-content/uploads/2025/07/SummerReunion.jpg?fit=1170%2C2080&ssl=1",
    location: "Surf Club, Goa, Goa",
    city: "Goa",
    state: "Goa",
    time: "Friday 10 PM - 3 AM",
  },
  {
    id: 8,
    title: "She’s With Us – Ce La Vi",
    category: "ladiesnight",
    image:
      "https://i0.wp.com/thepartyfinder.com/wp-content/uploads/2024/11/She-is-with-us-event.jpg?fit=700%2C337&ssl=1",
    location: "Ce La Vi, Bangalore, Karnataka",
    city: "Bangalore",
    state: "Karnataka",
    time: "Saturday 7 PM - 3 AM",
  },
  {
    id: 9,
    title: "Dream Dinner Show – The Palace Lounge",
    category: "dinner",
    image:
      "https://i0.wp.com/thepartyfinder.com/wp-content/uploads/2024/11/Dream-Event.jpg?fit=700%2C338&ssl=1",
    location: "The Palace Lounge, Mumbai, Maharashtra",
    city: "Mumbai",
    state: "Maharashtra",
    time: "Wed-Sun 8 PM - 3 AM",
  },
  {
    id: 10,
    title: "King Papa Fridays – Skyline Club",
    category: "ladiesnight",
    image:
      "https://i0.wp.com/thepartyfinder.com/wp-content/uploads/2025/06/KingPapaDubai-EventPic.jpg?fit=1080%2C1350&ssl=1",
    location: "Skyline Club, Delhi",
    city: "Delhi",
    state: "Delhi",
    time: "Friday 11 PM - 4 AM",
  },
  {
    id: 11,
    title: "Sky Dance Fridays – Blue Ocean Lounge",
    category: "brunch",
    video:
      "https://linvite-production.nyc3.cdn.digitaloceanspaces.com/landing-page-site-assets/Member%20Event%20Videos/second-video.mp4",
    location: "Blue Ocean Lounge, Goa",
    city: "Goa",
    state: "Goa",
    time: "Friday 11 PM - 4 AM",
  },
  {
    id: 12,
    title: "Urban Project Mondays – The Lounge House",
    category: "afterparty",
    image:
      "https://i0.wp.com/thepartyfinder.com/wp-content/uploads/2024/11/The-Rumba-Event.jpg?fit=700%2C338&ssl=1",
    location: "The Lounge House, Bangalore, Karnataka",
    city: "Bangalore",
    state: "Karnataka",
    time: "Monday 11 PM - 4 AM",
  },
  {
    id: 13,
    title: "Scandalous Thursdays – Bagatelle Club",
    category: "nightclub",
    image:
      "https://i0.wp.com/thepartyfinder.com/wp-content/uploads/2025/07/SCANDALOUS.jpg?fit=1080%2C1920&ssl=1",
    location: "Bagatelle Club, Mumbai, Maharashtra",
    city: "Mumbai",
    state: "Maharashtra",
    time: "Thursday 7 PM - 3 AM",
  },
  {
    id: 14,
    title: "She’s With Us Saturdays – Ce La Vi",
    category: "Nightclub",
    image:
      "https://i0.wp.com/thepartyfinder.com/wp-content/uploads/2024/11/She-is-with-us-event.jpg?fit=700%2C337&ssl=1",
    location: "Ce La Vi, Bangalore, Karnataka",
    city: "Bangalore",
    state: "Karnataka",
    time: "Saturday 7 PM - 3 AM",
  },
  {
    id: 15,
    title: "Bora Bora Fridays – Kaimana Beach",
    category: "afterparty",
    image:
      "https://i0.wp.com/thepartyfinder.com/wp-content/uploads/2025/06/BORA-BORA-POOL-PARTY-IN-DUBAI-1.jpg?fit=1080%2C1350&ssl=1",
    location: "Kaimana Beach, Goa",
    city: "Goa",
    state: "Goa",
    time: "Friday 12 PM - 8 PM",
  },
  {
    id: 16,
    title: "Summer Reunion Fridays – Surf Club",
    category: "beachclub",
    video:
      "https://linvite-production.nyc3.cdn.digitaloceanspaces.com/landing-page-site-assets/Member%20Event%20Videos/third-video.mp4",
    location: "Surf Club, Mumbai, Maharashtra",
    city: "Mumbai",
    state: "Maharashtra",
    time: "Friday 10 PM - 3 AM",
  },
];



const Events = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedCity, setSelectedCity] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const categories = [
    { key: "all", label: "All", icon: "fa-bars-staggered" },
    { key: "nightclub", label: "Nightclub", icon: "fa-music" },
    { key: "beachclub", label: "Beach & Pool", icon: "fa-umbrella-beach" },
    { key: "restaurant", label: "Restaurant", icon: "fa-utensils" },
    { key: "brunch", label: "Brunch", icon: "fa-mug-hot" },
    { key: "ladiesnight", label: "Ladies Night", icon: "fa-face-smile" },
    { key: "afterparty", label: "After Party", icon: "fa-guitar" },
    { key: "persian-arabic", label: "Persian & Arabic", icon: "fa-heart" },
  ];

  const cities = ["all", "Mumbai", "Delhi", "Goa", "Bangalore"];

  const filteredEvents = eventsData.filter((event) => {
    const matchCategory =
      selectedCategory === "all" || event.category === selectedCategory;
    const matchCity = selectedCity === "all" || event.city === selectedCity;
    const matchSearch = event.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchCategory && matchCity && matchSearch;
  });
 
  const handleReadMore = (event) => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user || !user.isSignup) {
    navigate("/");
  } else {
    navigate(`/events/${event.id}`);
  }
};

  return (
    <div className="events-page">
      <h2>🎉 Upcoming Events</h2>

      {/* Filters */}
      <div className="events-top-nav">
        <div className="city-filter">
          <label htmlFor="citySelect">📍 City:</label>
          <select
            id="citySelect"
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

        <div className="search-bar">
          <input
            type="text"
            placeholder="🔎 Search events..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Category Bar */}
      <ul className="event-category-bar">
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

      {/* Event Cards */}
      <div className="events-grid">
        {filteredEvents.map((event) => (
          <div key={event.id} className="event-card">
            {event.image ? (
              <img src={event.image} alt={event.title} className="event-img" />
            ) : event.video ? (
              <video
                src={event.video}
                className="event-img"
                autoPlay
                muted
                loop
              />
            ) : (
              <div className="no-media">No media available</div>
            )}

            <div className="event-info">
              <h3>{event.title}</h3>
              <p>
                📍 {event.location}
                <br /> 🕒 {event.time || event.date}
              </p>
              <p className="short-desc">
                {event.description?.length > 80
                  ? event.description.slice(0, 80) + "..."
                  : event.description}
              </p>
              <div className="event-btns">
                <button
                  className="details-btn"
                  onClick={() =>  handleReadMore(event)}
                >
                  Read More
                </button>

                <button className="book-btn" onClick={()=>handleReadMore(event)}>
                  Book Now
                </button>
              </div>
            </div>
          </div>
        ))}
        {filteredEvents.length === 0 && (
          <p className="no-results">No events found.</p>
        )}
      </div>
    </div>
  );
};

export default Events;
