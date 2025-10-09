import React from "react";
import "./Preview.css";

const ModelsPreview = ({ people }) => {
  return (
    <div className="preview-container">
      {people.slice(0, 3).map((person, index) => (
        <div className="preview-card" key={index}>
          <img src={person.img} alt={person.title} />
          <div className="preview-content">
            <h4>
              {person.title} {person.premium && <span className="premium-badge">Premium</span>}
            </h4>
            <p>{person.desc}</p>
          </div>
        </div>
      ))}
      <button className="view-all-btn">View All People</button>
    </div>
  );
};

export default ModelsPreview;
