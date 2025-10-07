import React from "react";

const ModelCard = ({ model, isPremium, onClick }) => {
  return (
    <div
      className={`model-card ${!isPremium ? "blurred" : ""}`}
      onClick={onClick}
    >
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
