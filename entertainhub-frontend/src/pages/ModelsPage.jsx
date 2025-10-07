import React, { useState } from "react";
import ModelCard from "../components/ModelCard";
import FilterSidebar from "../components/FilterSidebar";
import PremiumPopup from "../components/PremiumPopUp";
import ModelModal from "../components/ModelModel";
import "./models.css";

// Dummy data array
const modelsData = [
  {
    id: 1,
    first_name: "Sophia",
    last_name: "Lee",
    nationality: "American",
    age: 24,
    height_cm: 170,
    weight_kg: 55,
    skin_color: "Fair",
    relationship_status: "Single",
    eating_habits: "Vegan",
    religion: "None",
    instagram_url: "https://instagram.com/sophia",
    whatsapp_number: "+1234567890",
    email: "sophia@example.com",
    profile_image: "https://via.placeholder.com/300x400",
    videos: ["https://www.w3schools.com/html/mov_bbb.mp4"],
  },
  {
    id: 2,
    first_name: "Aria",
    last_name: "Patel",
    nationality: "Indian",
    age: 27,
    height_cm: 165,
    weight_kg: 50,
    skin_color: "Wheatish",
    relationship_status: "In Relationship",
    eating_habits: "Non-Veg",
    religion: "Hindu",
    instagram_url: "https://instagram.com/aria",
    whatsapp_number: "+1987654321",
    email: "aria@example.com",
    profile_image: "https://via.placeholder.com/300x400",
    videos: [],
  },
  // Add more models
];

const ModelsPage = () => {
  const [filters, setFilters] = useState({
    nationality: "",
    relationship_status: "",
    min_age: "",
    max_age: "",
  });

  const [isPremium] = useState(false); // Change to true to simulate premium
  const [selectedModel, setSelectedModel] = useState(null);

  const filteredModels = modelsData.filter((model) => {
    return (
      (!filters.nationality || model.nationality === filters.nationality) &&
      (!filters.relationship_status ||
        model.relationship_status === filters.relationship_status) &&
      (!filters.min_age || model.age >= filters.min_age) &&
      (!filters.max_age || model.age <= filters.max_age)
    );
  });

  const handleCardClick = (model) => {
    if (!isPremium) return;
    setSelectedModel(model);
  };

  const closeModal = () => setSelectedModel(null);

  return (
    <div className="models-page">
      {/* {!isPremium && <PremiumPopup />} */}
      <FilterSidebar filters={filters} setFilters={setFilters} />
      <div className="model-grid">
        {filteredModels.map((model) => (
          <ModelCard
            key={model.id}
            model={model}
            isPremium={isPremium}
            onClick={() => handleCardClick(model)}
          />
        ))}
      </div>
      {selectedModel && (
        <ModelModal model={selectedModel} onClose={closeModal} />
      )}
    </div>
  );
};

export default ModelsPage;
