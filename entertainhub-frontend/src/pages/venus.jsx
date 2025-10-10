import React, { useState } from "react";
import { nightclubEvents } from "./nightclubEvents";
import { beachpoolEvents } from "./beachpoolEvents";
import { venuesData } from "./venuedata";
import "./Venues.css";

const Venues = () => {
  const [activeTab, setActiveTab] = useState("all");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  // Combine all events for “All” tab
  const allEvents = [...venuesData , ...nightclubEvents, ...beachpoolEvents];

  // Mapping tab names to their event arrays
  const eventData = {
    all: allEvents,
    nightclub: nightclubEvents,
    beachpool: beachpoolEvents,
    restaurant: [],
    brunch: [],
    ladiesnight: [],
    afterparty: [],
    persianarabic: [],
  };

  return (
    <div className="venues-page">
      <h1 className="venues-title">Venues & Events</h1>

      {/* Top Sub-Bar */}
      <ul className="venues-tabs">
        <li
          className={activeTab === "all" ? "active" : ""}
          onClick={() => handleTabClick("all")}
        >
          <i className="fa-solid fa-bars-staggered"></i> All
        </li>
        <li
          className={activeTab === "nightclub" ? "active" : ""}
          onClick={() => handleTabClick("nightclub")}
        >
          <i className="fa-solid fa-music"></i> Nightclub
        </li>
        <li
          className={activeTab === "beachpool" ? "active" : ""}
          onClick={() => handleTabClick("beachpool")}
        >
          <i className="fa-solid fa-umbrella-beach"></i> Beach & Pool
        </li>
        <li
          className={activeTab === "restaurant" ? "active" : ""}
          onClick={() => handleTabClick("restaurant")}
        >
          <i className="fa-solid fa-utensils"></i> Restaurant
        </li>
        <li
          className={activeTab === "brunch" ? "active" : ""}
          onClick={() => handleTabClick("brunch")}
        >
          <i className="fa-solid fa-mug-hot"></i> Brunch
        </li>
        <li
          className={activeTab === "ladiesnight" ? "active" : ""}
          onClick={() => handleTabClick("ladiesnight")}
        >
          <i className="fa-solid fa-face-smile"></i> Ladies Night
        </li>
        <li
          className={activeTab === "afterparty" ? "active" : ""}
          onClick={() => handleTabClick("afterparty")}
        >
          <i className="fa-solid fa-guitar"></i> After Party
        </li>
        <li
          className={activeTab === "persianarabic" ? "active" : ""}
          onClick={() => handleTabClick("persianarabic")}
        >
          <i className="fa-regular fa-heart"></i> Persian & Arabic
        </li>
      </ul>

      {/* Events Section */}
      <div className="event-grid">
        {eventData[activeTab].length > 0 ? (
          eventData[activeTab].map((event, index) => (
            <div key={index} className="event-card">
              <img src={event.image} alt={event.eventName} />
              <div className="event-info">
                <h3>{event.eventName}</h3>
                <p><strong>Days:</strong> {event.days}</p>
                <p><strong>Time:</strong> {event.time}</p>
                <p><strong>Venue:</strong> {event.venue}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="no-events">No events available in this category.</p>
        )}
      </div>
    </div>
  );
};

export default Venues;
