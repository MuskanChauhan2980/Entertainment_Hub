// EventDetails.jsx
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import eventsData from "./eventsData"; // move your eventsData to a separate file
import "./EventDetails.css";

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const event = eventsData.find((ev) => ev.id === parseInt(id));

  if (!event) {
    return <p className="no-event">Event not found.</p>;
  }

    const user = JSON.parse(localStorage.getItem("user"));
  if (!user || !user.isSignup) {
    navigate("/signup");
    return null;
  }

  return (
    <div className="event-details-page">
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <h2>{event.title}</h2>

      {event.image ? (
        <img src={event.image} alt={event.title} className="event-media" />
      ) : event.video ? (
        <video src={event.video} className="event-media" controls />
      ) : (
        <div className="no-media">No media available</div>
      )}

      <div className="event-info">
        <p>📍 Location: {event.location}</p>
        <p>🕒 {event.time || event.date}</p>
        <p>{event.description}</p>
        <button className="signup-btn" onClick={() => navigate("/premium")}>
           Take Premium to Attend 
        </button>
      </div>
    </div>
  );
};

export default EventDetails;
