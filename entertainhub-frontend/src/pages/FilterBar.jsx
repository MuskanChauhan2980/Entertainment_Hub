import React from "react";
import "./models.css";

const FilterBar = ({ filters, setFilters }) => {
  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div className="filter-bar">
      <select name="nationality" onChange={handleChange}>
        <option value="">Nationality</option>
        <option value="American">American</option>
        <option value="Indian">Indian</option>
      </select>

      <select name="relationship_status" onChange={handleChange}>
        <option value="">Relationship Status</option>
        <option value="Single">Single</option>
        <option value="In Relationship">In Relationship</option>
      </select>

      <input
        type="number"
        name="min_age"
        placeholder="Min Age"
        onChange={handleChange}
      />
      <input
        type="number"
        name="max_age"
        placeholder="Max Age"
        onChange={handleChange}
      />
    </div>
  );
};

export default FilterBar;
