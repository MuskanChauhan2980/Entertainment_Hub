import React, { useState } from "react";
import { nightclubEvents } from "./nightclubEvents";
import { beachpoolEvents } from "./beachpoolEvents";
import { venuesData } from "./venuedata";
import {restaurantData} from "./RestaurantsData";
import {ladiesNight} from "./BrunchData";
import{afterParty} from"./Afterparty"
import "./Venues.css";

const Venues = () => {
  const [activeTab, setActiveTab] = useState("all");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

 

  // Combine all events for “All” tab
  const allEvents = [...venuesData, ...nightclubEvents, ...beachpoolEvents, ...restaurantData];

  // Mapping tab names to their event arrays
  const eventData = {
    all: allEvents,
    nightclub: nightclubEvents,
    beachpool: beachpoolEvents,
    restaurant: restaurantData,
    brunch: beachpoolEvents,
    ladiesnight: ladiesNight,
    afterparty: afterParty,
    persianarabic: [],
  };

  return (
    <div className="venues-page">
      <h1 className="venues-title">Venues & Events</h1>

      {/* Tabs Bar */}
      <ul className="venues-tabs">
        {[
          ["all", "fa-bars-staggered", "All"],
          ["nightclub", "fa-music", "Nightclub"],
          ["beachpool", "fa-umbrella-beach", "Beach & Pool"],
          ["restaurant", "fa-utensils", "Restaurant"],
          ["brunch", "fa-mug-hot", "Brunch"],
          ["ladiesnight", "fa-face-smile", "Ladies Night"],
          ["afterparty", "fa-guitar", "After Party"],
          ["persianarabic", "fa-heart", "Persian & Arabic"],
        ].map(([tab, icon, label]) => (
          <li
            key={tab}
            className={activeTab === tab ? "active" : ""}
            onClick={() => handleTabClick(tab)}
          >
            <i className={`fa-solid ${icon}`}></i> {label}
          </li>
        ))}
      </ul>

      {/* Events Section */}
      <div className="event-grid">
        {eventData[activeTab].length > 0 ? (
          eventData[activeTab].map((event, index) => (
            <div key={index} className="event-card">
              <img
                src={event.image || event.img}
                alt={event.eventName || event.name}
              />
              <div className="event-info">
                <h3>{event.eventName || event.name}</h3>
                {event.days && <p><strong>Days:</strong> {event.days}</p>}
                {event.time && <p><strong>Time:</strong> {event.time}</p>}
                {event.venue && <p><strong>Venue:</strong> {event.venue}</p>}
                {event.city && <p><strong>City:</strong> {event.city}</p>}
                {event.desc && <p>{event.desc}</p>}
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
