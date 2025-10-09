import React from "react";
import { useNavigate } from "react-router-dom";
import "./UpcomingEventsPreview.css";

const upcomingEvents = [
  { date: "Oct 11, 2025", name: "Beach Festival", location: "Bluewater Beach" },
  { date: "Oct 12, 2025", name: "DJ Spectrum Night", location: "Skyline Lounge" },
  { date: "Oct 18, 2025", name: "Music Carnival", location: "Moonlight Arena" },
  { date: "Oct 19, 2025", name: "Poolside Vibes", location: "Sunset Pool" },
];

export default function UpcomingEventsPreview() {
  const navigate = useNavigate();

  return (
    <section className="upcoming-section">
      <h3>🗓️ Upcoming Events</h3>
      <div className="upcoming-grid">
        {upcomingEvents.map((event, index) => (
          <div className="upcoming-card" key={index}>
            <p className="event-date">{event.date}</p>
            <h4>{event.name}</h4>
            <p className="event-location">{event.location}</p>
          </div>
        ))}
      </div>

      <button className="view-calendar-btn" onClick={() => navigate("/calendar")}>
        View Full Calendar →
      </button>
    </section>
  );
}
