import React, { useState } from "react";
import "./Restaurants.css";

const restaurantData = [
  { id: 1, name: "Bluewater Restaurant", city: "Miami", state: "Florida", rating: 4, img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=60" },
  { id: 2, name: "Skyline Lounge", city: "New York", state: "New York", rating: 5, img: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed56?auto=format&fit=crop&w=800&q=60" },
  { id: 3, name: "Wave Night Club", city: "Los Angeles", state: "California", rating: 4, img: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=800&q=60" },
  { id: 4, name: "Seaside Grill", city: "Miami", state: "Florida", rating: 3, img: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&w=800&q=60" },
  { id: 5, name: "Sunset Diner", city: "Los Angeles", state: "California", rating: 5, img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&w=800&q=60" },
  { id: 6, name: "Ocean Breeze Café", city: "Miami", state: "Florida", rating: 4, img: "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?auto=format&w=800&q=60" },
  { id: 7, name: "City Lights Bistro", city: "New York", state: "New York", rating: 3, img: "https://images.unsplash.com/photo-1525610553991-2bede1a236e2?auto=format&w=800&q=60" },
  { id: 8, name: "Harbor View Grill", city: "San Francisco", state: "California", rating: 4, img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&w=800&q=60" },
  { id: 9, name: "Palm Grove Eatery", city: "Orlando", state: "Florida", rating: 5, img: "https://images.unsplash.com/photo-1543353071-873f17a7a088?auto=format&w=800&q=60" },
  { id: 10, name: "Golden Leaf Dine", city: "Chicago", state: "Illinois", rating: 4, img: "https://images.unsplash.com/photo-1551782450-17144efb9c50?auto=format&w=800&q=60" },
  { id: 11, name: "Rooftop Bar & Grill", city: "Austin", state: "Texas", rating: 5, img: "https://images.unsplash.com/photo-1520201163981-8cc95007dd2a?auto=format&w=800&q=60" },
  { id: 12, name: "Moonlight Café", city: "Seattle", state: "Washington", rating: 4, img: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed56?auto=format&w=800&q=60" },
];

const Card = ({ restaurant }) => {
  const handleBook = () => {
    alert("Please sign up to book a seat.");
  };

  return (
    <div className="restaurant-card">
      <img src={restaurant.img} alt={restaurant.name} />
      <div className="restaurant-info">
        <h4>{restaurant.name}</h4>
        <p>
          {restaurant.city}, {restaurant.state}
        </p>
        <p className="stars">{"⭐".repeat(restaurant.rating)}</p>
        <button className="book-btn" onClick={handleBook}>Book Seat</button>
      </div>
    </div>
  );
};

const Restaurants = () => {
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
        {filteredRestaurants.length > 0 ? (
          filteredRestaurants.map((r) => <Card key={r.id} restaurant={r} />)
        ) : (
          <p className="no-results">No restaurants match your filters.</p>
        )}
      </section>
    </div>
  );
};

export default Restaurants;
