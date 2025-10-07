import React from "react";

const ModelModal = ({ model, onClose }) => {
  return (
    <div className="model-modal">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>
          &times;
        </button>
        <img src={model.profile_image} alt={model.first_name} />
        <h2>
          {model.first_name} {model.last_name}
        </h2>
        <p>Nationality: {model.nationality}</p>
        <p>Age: {model.age}</p>
        <p>Height: {model.height_cm} cm</p>
        <p>Weight: {model.weight_kg} kg</p>
        <p>Skin Color: {model.skin_color}</p>
        <p>Relationship: {model.relationship_status}</p>
        <p>Eating Habits: {model.eating_habits}</p>
        <p>Religion: {model.religion}</p>
        <p>
          Instagram:{" "}
          <a href={model.instagram_url} target="_blank" rel="noreferrer">
            {model.instagram_url}
          </a>
        </p>
        <p>Email: {model.email}</p>
        <p>WhatsApp: {model.whatsapp_number}</p>
        {model.videos.length > 0 && (
          <div className="video-gallery">
            {model.videos.map((video, i) => (
              <video key={i} controls src={video} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ModelModal;
