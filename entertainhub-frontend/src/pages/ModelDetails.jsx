 import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import models from "./modelsData";
import "./modelDetails.css";

export default function ModelDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const model = models.find((m) => m.id === parseInt(id));

  if (!model) {
    return (
      <div className="model-details-page">
        <p>Model not found.</p>
      </div>
    );
  }

  return (
    <div className="model-details-page">
      <button className="back-btn" onClick={() => navigate(-1)}>
        <i className="fa-solid fa-arrow-left"></i> Back to Models
      </button>
      
      <div className="model-details-card">
        <img src={model.img} alt={model.name} />
        <h2>{model.name}</h2>
        
        {model.premium && (
          <span className="premium-badge">
            <i className="fa-solid fa-crown"></i> Premium Model
          </span>
        )}

        <div className="model-details-grid">
          <div className="detail-item">
            <strong>First Name</strong>
            <p>{model.first_name}</p>
          </div>
          
          <div className="detail-item">
            <strong>Last Name</strong>
            <p>{model.last_name}</p>
          </div>
          
          <div className="detail-item">
            <strong>Nationality</strong>
            <p>{model.nationality}</p>
          </div>
          
          <div className="detail-item">
            <strong>Age</strong>
            <p>{model.age} years</p>
          </div>
          
          <div className="detail-item">
            <strong>Height</strong>
            <p>{model.height_cm} cm</p>
          </div>
          
          <div className="detail-item">
            <strong>Weight</strong>
            <p>{model.weight_kg} kg</p>
          </div>
          
          <div className="detail-item">
            <strong>Skin Color</strong>
            <p>{model.skin_color}</p>
          </div>
          
          <div className="detail-item">
            <strong>Relationship Status</strong>
            <p>{model.relationship_status}</p>
          </div>
          
          <div className="detail-item">
            <strong>Eating Habits</strong>
            <p>{model.eating_habits}</p>
          </div>
          
          <div className="detail-item">
            <strong>Religion</strong>
            <p>{model.religion}</p>
          </div>
        </div>

        {/* Contact Section */}
        <div className="contact-section">
          <h3>Contact Information</h3>
          <div className="contact-links">
            <a 
              href={model.instagram_url} 
              target="_blank" 
              rel="noreferrer" 
              className="contact-link instagram"
            >
              <i className="fa-brands fa-instagram"></i> Instagram
            </a>
            
            <a 
              href={`https://wa.me/${model.whatsapp_number}`} 
              target="_blank" 
              rel="noreferrer" 
              className="contact-link whatsapp"
            >
              <i className="fa-brands fa-whatsapp"></i> WhatsApp
            </a>
            
            <a 
              href={`mailto:${model.email}`} 
              className="contact-link email"
            >
              <i className="fa-solid fa-envelope"></i> Email
            </a>
          </div>
        </div>

        {/* Additional Social Links */}
        <div className="social-links">
          <a 
            href={model.instagram_url} 
            target="_blank" 
            rel="noreferrer" 
            className="social-link"
            title="Instagram"
          >
            <i className="fa-brands fa-instagram"></i>
          </a>
          
          <a 
            href={`https://wa.me/${model.whatsapp_number}`} 
            target="_blank" 
            rel="noreferrer" 
            className="social-link"
            title="WhatsApp"
          >
            <i className="fa-brands fa-whatsapp"></i>
          </a>
          
          <a 
            href={`mailto:${model.email}`} 
            className="social-link"
            title="Email"
          >
            <i className="fa-solid fa-envelope"></i>
          </a>
        </div>
      </div>
    </div>
  );
}