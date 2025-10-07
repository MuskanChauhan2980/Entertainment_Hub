 import React, { useState } from "react";
import "./Events.css";

const Events = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);

  const eventsList = [
    {
      id: 1,
      title: "DJ Spectrum Night",
      date: "2025-10-12",
      location: "Skyline Lounge, Mumbai",
      category: "Music",
      image: "https://images.unsplash.com/photo-1561484930-998b6a7bfc5e?auto=format&fit=crop&w=800&q=60",
      description:
        "An electrifying night with top DJs spinning the hottest tracks. Come and dance the night away at Skyline Lounge.",
    },
    {
      id: 2,
      title: "Beach Music Festival",
      date: "2025-10-18",
      location: "Bluewater Beach, Goa",
      category: "Festival",
      image: "https://images.unsplash.com/photo-1519677100203-a0e668c92439?auto=format&fit=crop&w=800&q=60",
      description:
        "Enjoy the rhythm of waves and music! A two-day beach festival featuring live bands, DJs, and food stalls.",
    },
    {
      id: 3,
      title: "Live Concert Night",
      date: "2025-11-01",
      location: "City Arena, Delhi",
      category: "Concert",
      image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=60",
      description:
        "Experience the biggest live concert of the year with your favorite rock bands performing live on stage.",
    },
    {
      id: 4,
      title: "Gourmet Food Carnival",
      date: "2025-11-15",
      location: "Downtown Plaza, Bangalore",
      category: "Food",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=60",
      description:
        "Taste the world! A grand food carnival bringing together chefs and cuisines from around the globe.",
    },
  ];

  return (
    <div className="events-page">
      <h2>🎉 Upcoming Events</h2>
      <div className="events-grid">
        {eventsList.map((event) => (
          <div
            className="event-card"
            key={event.id}
            onClick={() => setSelectedEvent(event)}
          >
            <img src={event.image} alt={event.title} className="event-img" />
            <div className="event-info">
              <h3>{event.title}</h3>
              <p>{event.date}</p>
              <p>{event.location}</p>
              <button className="details-btn">View Details</button>
            </div>
          </div>
        ))}
      </div>

      {/* Event Modal */}
      {selectedEvent && (
        <div className="modal" onClick={() => setSelectedEvent(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close" onClick={() => setSelectedEvent(null)}>
              &times;
            </span>
            <img
              src={selectedEvent.image}
              alt={selectedEvent.title}
              className="modal-img"
            />
            <h2>{selectedEvent.title}</h2>
            <p className="date-location">
              📅 {selectedEvent.date} | 📍 {selectedEvent.location}
            </p>
            <p className="category">🎭 Category: {selectedEvent.category}</p>
            <p className="description">{selectedEvent.description}</p>
            <button className="book-btn">Book Now</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Events;
