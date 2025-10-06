import React, { useState } from "react";
import "./Restaurants.css";

// Sample restaurant data
const restaurantData = [
  {
    id: 1,
    name: "Bluewater Restaurant",
    city: "Miami",
    state: "Florida",
    rating: 4,
    img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 2,
    name: "Skyline Lounge",
    city: "New York",
    state: "New York",
    rating: 5,
    img: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed56?auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 3,
    name: "Wave Night Club",
    city: "Los Angeles",
    state: "California",
    rating: 4,
    img: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 4,
    name: "Seaside Grill",
    city: "Miami",
    state: "Florida",
    rating: 3,
    img: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=800&q=60",
  },
];

const Card = ({ restaurant }) => (
  <div className="restaurant-card">
    <img src={restaurant.img} alt={restaurant.name} />
    <h4>{restaurant.name}</h4>
    <p>
      {restaurant.city}, {restaurant.state}
    </p>
    <p>{"⭐".repeat(restaurant.rating)}</p>
  </div>
);

const Restaurants = () => {
  const [cityFilter, setCityFilter] = useState("");
  const [stateFilter, setStateFilter] = useState("");
  const [minRating, setMinRating] = useState(0);

  const filteredRestaurants = restaurantData.filter(
    (r) =>
      (!cityFilter || r.city.toLowerCase() === cityFilter.toLowerCase()) &&
      (!stateFilter || r.state.toLowerCase() === stateFilter.toLowerCase()) &&
      r.rating >= minRating
  );

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
