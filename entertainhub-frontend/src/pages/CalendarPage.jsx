import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./CalendarPage.css"; // updated style

// 🎉 Sample event data
const events = [
  { date: "2025-10-11", name: "Beach Festival", location: "Bluewater Beach" },
  { date: "2025-10-12", name: "DJ Spectrum Night", location: "Skyline Lounge" },
  { date: "2025-10-16", name: "Cocktail Party", location: "Wave Club" },
  { date: "2025-10-18", name: "Music Carnival", location: "Moonlight Arena" },
  { date: "2025-10-19", name: "Poolside Vibes", location: "Sunset Pool" },
  { date: "2025-10-22", name: "Neon Night", location: "Galaxy Lounge" },
  { date: "2025-10-26", name: "Food & Beats", location: "Luna Bar" },

  { date: "2025-11-11", name: "Beach Festival", location: "Bluewater Beach" },
  { date: "2025-11-12", name: "DJ Spectrum Night", location: "Skyline Lounge" },
  { date: "2025-11-16", name: "Cocktail Party", location: "Wave Club" },
  { date: "2025-11-18", name: "Music Carnival", location: "Moonlight Arena" },
  { date: "2025-11-19", name: "Poolside Vibes", location: "Sunset Pool" },
  { date: "2025-11-22", name: "Neon Night", location: "Galaxy Lounge" },
  { date: "2025-11-26", name: "Food & Beats", location: "Luna Bar" },
];

export default function CalendarPage() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const formatDate = (date) => date.toLocaleDateString("en-CA");

  const eventsForDate = events.filter(
    (event) => event.date === formatDate(selectedDate)
  );

  const tileContent = ({ date }) => {
    const dateStr = formatDate(date);
    const hasEvent = events.some((e) => e.date === dateStr);
    return hasEvent ? <div className="event-dot"></div> : null;
  };

  return (
    <div className="calendar-page">
      <h2>🎉 Events Calendar</h2>
      <p>Click a date to see what’s happening!</p>

      <div className="calendar-container">
        <Calendar
          onChange={setSelectedDate}
          value={selectedDate}
          tileContent={tileContent}
        />
      </div>

      <div className="events-list">
        <h3>Events on {selectedDate.toDateString()}</h3>
        {eventsForDate.length > 0 ? (
          <ul>
            {eventsForDate.map((event, index) => (
              <li key={index} className="event-item">
                <strong>{event.name}</strong> — {event.location}
              </li>
            ))}
          </ul>
        ) : (
          <p className="no-events">No events on this day.</p>
        )}
      </div>
    </div>
  );
}

