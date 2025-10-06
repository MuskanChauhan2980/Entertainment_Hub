// src/App.jsx
import React from "react";
import "./App.css";
 

const events = [
  {
    img: "https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2?auto=format&fit=crop&w=800&q=60",
    title: "DJ Spectrum Night",
    desc: "Experience electrifying beats under the stars.",
  },
  {
    img: "https://images.unsplash.com/photo-1525182008055-f88b95ff7980?auto=format&fit=crop&w=800&q=60",
    title: "Beach Music Festival",
    desc: "Sun, sand, and sounds of summer.",
  },
  {
    img: "https://images.unsplash.com/photo-1519677100203-a0e668c92439?auto=format&fit=crop&w=800&q=60",
    title: "Live Concert Night",
    desc: "Feel the rhythm with the city’s top artists.",
  },
];

const venues = [
  {
    img: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed56?auto=format&fit=crop&w=800&q=60",
    title: "Skyline Lounge",
    desc: "Luxury meets music with stunning city views."
  },
  {
    img: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=800&q=60",
    title: "Wave Night Club",
    desc: "Where every night becomes unforgettable.",
  },
  {
    img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=60",
    title: "Bluewater Restaurant",
    desc: "Dine by the sea with world-class chefs.",
  },
];

const people = [
  {
    img: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=800&q=60",
    title: "DJ Ayesha",
    desc: "Top electronic DJ across India’s nightclubs.",
  },
  {
    img: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=800&q=60",
    title: "Chef Lorenzo",
    desc: "Signature dishes from world cuisines.",
  },
  {
    img: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=800&q=60",
    title: "Promoter Rhea",
    desc: "Bringing unforgettable nightlife experiences.",
  },
];

const CardGrid = ({ items }) => (
  <div className="grid">
    {items.map((item, index) => (
      <div className="card" key={index}>
        <img src={item.img} alt={item.title} />
        <h4>{item.title}</h4>
        <p>{item.desc}</p>
        <p>{item.time?item.time:""}</p>
      </div>
    ))}
  </div>
);

function  Home() {
  return (
    <div className="App">
      <header>
        <h1>Entertainment Hub</h1>
        <nav>
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
          <div className="dropdown">
            <button className="dropbtn">Partner / Submit ▾</button>
            <div className="dropdown-content">
              <a href="#">DJ Party Submission</a>
              <a href="#">Venue Registration</a>
              <a href="#">Promoter Form</a>
              <a href="#">Influencer Application</a>
            </div>
          </div>
          <div className="dropdown">
            <button className="dropbtn">Bookings ▾</button>
            <div className="dropdown-content">
              <a href="#">Guestlist</a>
              <a href="#">Table Booking</a>
              <a href="#">Chauffeur Service</a>
            </div>
          </div>
          <div className="dropdown">
            <button className="dropbtn">Premium ▾</button>
            <div className="dropdown-content">
              <a href="#">Membership Info</a>
              <a href="#">Apply for Premium</a>
            </div>
          </div>
        </nav>
      </header>

      <section className="hero">
        <h2>Discover the Best Events & Venues Near You</h2>
        <p>Restaurants • Beach Clubs • Nightlife • Music Festivals • Parties</p>
      </section>

      <section className="section">
        <h3>🎧 Featured Events</h3>
        <CardGrid items={events} />
      </section>

      <section className="section">
        <h3>🏛️ Popular Venues</h3>
        <CardGrid items={venues} />
      </section>

      <section className="section">
        <h3>👥 Featured People</h3>
        <CardGrid items={people} />
      </section>

      <footer>
        © 2025 Entertainment Hub | Designed by Muskan Chauhan
      </footer>
    </div>
  );
}

export default Home;