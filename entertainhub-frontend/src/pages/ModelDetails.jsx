import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import models from "./modelsData"; // Import the full models array
import "./modelDetails.css";

export default function ModelDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const model = models.find((m) => m.id === parseInt(id));

  if (!model) {
    return <p>Model not found.</p>;
  }

  return (
    <div className="model-details-page">
      <button className="back-btn" onClick={() => navigate(-1)}>
        &larr; Back
      </button>
      <div className="model-details-card">
        <img src={model.img} alt={model.name} />
        <h2>{model.name}</h2>
        {model.premium && <span className="premium-badge">Premium</span>}
        <p><strong>First Name:</strong> {model.first_name}</p>
        <p><strong>Last Name:</strong> {model.last_name}</p>
        <p><strong>Nationality:</strong> {model.nationality}</p>
        <p><strong>Age:</strong> {model.age}</p>
        <p><strong>Height:</strong> {model.height_cm} cm</p>
        <p><strong>Weight:</strong> {model.weight_kg} kg</p>
        <p><strong>Skin Color:</strong> {model.skin_color}</p>
        <p><strong>Relationship Status:</strong> {model.relationship_status}</p>
        <p><strong>Eating Habits:</strong> {model.eating_habits}</p>
        <p><strong>Religion:</strong> {model.religion}</p>
        <p>
          <strong>Instagram:</strong>{" "}
          <a href={model.instagram_url} target="_blank" rel="noreferrer">
            {model.instagram_url}
          </a>
        </p>
        <p><strong>WhatsApp:</strong> {model.whatsapp_number}</p>
        <p><strong>Email:</strong> {model.email}</p>
      </div>
    </div>
  );
}
