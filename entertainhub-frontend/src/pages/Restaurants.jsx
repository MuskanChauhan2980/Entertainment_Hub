import React, { useState } from "react";
import "./Restaurants.css";

const restaurantData = [
  {
    id: 1,
    name: "Bluewater Restaurant",
    city: "Miami",
    state: "Florida",
    rating: 4,
    img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=60",
    video: "https://www.w3schools.com/html/mov_bbb.mp4",
    desc: "Enjoy exquisite seafood and tropical vibes at the famous Bluewater Restaurant, right by Miami beach.",
  },
  {
    id: 2,
    name: "Skyline Lounge",
    city: "New York",
    state: "New York",
    rating: 5,
    img: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed56?auto=format&fit=crop&w=800&q=60",
    video: "https://www.youtube.com/embed/ysz5S6PUM-U",
    desc: "Luxury meets comfort at the Skyline Lounge — dine with breathtaking views of New York’s skyline.",
  },
  {
    id: 3,
    name: "Wave Night Club",
    city: "Los Angeles",
    state: "California",
    rating: 4,
    img: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=800&q=60",
    video: "https://www.w3schools.com/html/movie.mp4",
    desc: "A perfect blend of dining and nightlife, Wave Night Club offers a modern twist on coastal cuisine.",
  },
  {
    id: 4,
    name: "Seaside Grill",
    city: "Miami",
    state: "Florida",
    rating: 3,
    img: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&w=800&q=60",
    video: "https://www.youtube.com/embed/tgbNymZ7vqY",
    desc: "Relax by the shore with mouthwatering grilled specials and live music every weekend.",
  },
  {
    id: 5,
    name: "Sunset Diner",
    city: "Los Angeles",
    state: "California",
    rating: 5,
    img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&w=800&q=60",
    video: "https://www.youtube.com/embed/oUFJJNQGwhk",
    desc: "Classic diner vibes with a gourmet twist — famous for its handmade burgers and cocktails.",
  },
  {
    id: 6,
    name: "Ocean Breeze Café",
    city: "Miami",
    state: "Florida",
    rating: 4,
    img: "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?auto=format&w=800&q=60",
    video: "https://www.w3schools.com/html/mov_bbb.mp4",
    desc: "Chill atmosphere with freshly brewed coffee, ocean views, and live acoustic sessions.",
  },
  {
    id: 7,
    name: "City Lights Bistro",
    city: "New York",
    state: "New York",
    rating: 3,
    img: "https://images.unsplash.com/photo-1525610553991-2bede1a236e2?auto=format&w=800&q=60",
    video: "https://www.youtube.com/embed/tgbNymZ7vqY",
    desc: "Trendy bistro known for innovative cocktails and a cozy ambiance in downtown NYC.",
  },
  {
    id: 8,
    name: "Harbor View Grill",
    city: "San Francisco",
    state: "California",
    rating: 4,
    img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&w=800&q=60",
    video: "https://www.w3schools.com/html/movie.mp4",
    desc: "A seafood lover’s paradise offering a beautiful view of the harbor and fresh daily catches.",
  },
  {
    id: 9,
    name: "Palm Grove Eatery",
    city: "Orlando",
    state: "Florida",
    rating: 5,
    img: "https://images.unsplash.com/photo-1543353071-873f17a7a088?auto=format&w=800&q=60",
    video: "https://www.youtube.com/embed/oUFJJNQGwhk",
    desc: "A tropical-themed eatery offering fresh fruit platters and exotic beverages under palm trees.",
  },
  {
    id: 10,
    name: "Golden Leaf Dine",
    city: "Chicago",
    state: "Illinois",
    rating: 4,
    img: "https://images.unsplash.com/photo-1551782450-17144efb9c50?auto=format&w=800&q=60",
    video: "https://www.youtube.com/embed/ysz5S6PUM-U",
    desc: "Elegant restaurant serving a fusion of Asian and Western cuisines with style.",
  },
  {
    id: 11,
    name: "Rooftop Bar & Grill",
    city: "Austin",
    state: "Texas",
    rating: 5,
    img: "https://images.unsplash.com/photo-1520201163981-8cc95007dd2a?auto=format&w=800&q=60",
    video: "https://www.w3schools.com/html/mov_bbb.mp4",
    desc: "Dine under the stars with the city skyline at Austin’s most popular rooftop venue.",
  },
  {
    id: 12,
    name: "Moonlight Café",
    city: "Seattle",
    state: "Washington",
    rating: 4,
    img: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed56?auto=format&w=800&q=60",
    video: "https://www.youtube.com/embed/tgbNymZ7vqY",
    desc: "A peaceful café famous for its pastries, warm drinks, and calm moonlit view.",
  },
];

const Restaurants = () => {
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [cityFilter, setCityFilter] = useState("");
  const [stateFilter, setStateFilter] = useState("");
  const [minRating, setMinRating] = useState(0);

  const normalize = (text) => text.trim().toLowerCase();

  const filteredRestaurants = restaurantData.filter((r) => {
    return (
      (!cityFilter || normalize(r.city).includes(normalize(cityFilter))) &&
      (!stateFilter || normalize(r.state).includes(normalize(stateFilter))) &&
      r.rating >= minRating
    );
  });

  const handleBook = () => {
    alert("Please sign up to book a seat.");
  };

  const isYouTubeLink = (url) => url.includes("youtube.com") || url.includes("youtu.be");

  return (
    <div className="restaurants-page">
      <header>
        <h1>Restaurants</h1>
      </header>

      <section className="filters">
        <input
          type="text"
          placeholder="Filter by city"
          value={cityFilter}
          onChange={(e) => setCityFilter(e.target.value)}
        />
        <input
          type="text"
          placeholder="Filter by state"
          value={stateFilter}
          onChange={(e) => setStateFilter(e.target.value)}
        />
        <select value={minRating} onChange={(e) => setMinRating(Number(e.target.value))}>
          <option value={0}>All Ratings</option>
          <option value={1}>1 Star & above</option>
          <option value={2}>2 Stars & above</option>
          <option value={3}>3 Stars & above</option>
          <option value={4}>4 Stars & above</option>
          <option value={5}>5 Stars</option>
        </select>
      </section>

      <section className="restaurant-grid">
        {filteredRestaurants.map((r) => (
          <div className="restaurant-card" key={r.id} onClick={() => setSelectedRestaurant(r)}>
            <img src={r.img} alt={r.name} />
            <div className="restaurant-info">
              <h4>{r.name}</h4>
              <p>
                {r.city}, {r.state}
              </p>
              <p className="stars">{"⭐".repeat(r.rating)}</p>
              <button
                className="book-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  handleBook();
                }}
              >
                Book Seat
              </button>
            </div>
          </div>
        ))}
      </section>

      {/* Modal Popup with Image + Video */}
      {selectedRestaurant && (
        <div className="modal" onClick={() => setSelectedRestaurant(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close" onClick={() => setSelectedRestaurant(null)}>
              &times;
            </span>

            <img src={selectedRestaurant.img} alt={selectedRestaurant.name} className="modal-img" />

            {isYouTubeLink(selectedRestaurant.video) ? (
              <iframe
                className="modal-video"
                src={selectedRestaurant.video}
                title={selectedRestaurant.name}
                allowFullScreen
              ></iframe>
            ) : (
              <video className="modal-video" controls>
                <source src={selectedRestaurant.video} type="video/mp4" />
                Your browser does not support HTML video.
              </video>
            )}

            <h2>{selectedRestaurant.name}</h2>
            <p className="stars">{"⭐".repeat(selectedRestaurant.rating)}</p>
            <p>📍 {selectedRestaurant.city}, {selectedRestaurant.state}</p>
            <p className="desc">{selectedRestaurant.desc}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Restaurants;
