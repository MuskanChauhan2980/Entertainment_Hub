import React from "react";
import "./models.css";

const ModelCard = ({ model, isPremium }) => {
  const handleClick = () => {
    if (!isPremium) {
      alert("Sorry, only for premium members!");
    } else {
      alert(`Full details of ${model.first_name} ${model.last_name}`);
    }
  };

  return (
    <div className="model-card" onClick={handleClick}>
      <img src={model.profile_image} alt={model.first_name} />
      <h3>
        {model.first_name} {model.last_name}
      </h3>
      <p>{model.nationality}</p>
      <p>{model.age} yrs</p>
      <p>{model.relationship_status}</p>
    </div>
  );
};

export default ModelCard;
