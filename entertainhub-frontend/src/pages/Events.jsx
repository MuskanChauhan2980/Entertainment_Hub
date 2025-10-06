import React from "react";

const eventsList = [
  { title: "DJ Spectrum Night", date: "2025-10-12", location: "Skyline Lounge" },
  { title: "Beach Music Festival", date: "2025-10-18", location: "Bluewater Beach" },
  { title: "Live Concert Night", date: "2025-11-01", location: "City Arena" },
];

const Events = () => {
  return (
    <div className="section">
      <h2>🎶 Upcoming Events</h2>
      <ul>
        {eventsList.map((event, index) => (
          <li key={index}>
            <strong>{event.title}</strong> - {event.date} @ {event.location}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Events;
