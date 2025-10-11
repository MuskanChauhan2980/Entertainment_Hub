import React, { useEffect,useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { useNavigate } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./models.css";
// import "../components/UpcomingEventsPreview.css";

const SliderModel = [
  {
    id: 1,
    img: "https://turnupdubai.com/wp-content/uploads/2025/03/03246-1.jpg",
    name: "Model Ayesha",
    premium: true,
  },
  {
    id: 2,
    img: "https://turnupdubai.com/wp-content/uploads/2025/03/03247-1.jpg",
    name: "Model Rhea",
    premium: true,
  },
  {
    id: 3,
    img: "https://turnupdubai.com/wp-content/uploads/2025/03/0324-2.jpg",
    name: "Model Zara",
  },
  {
    id: 4,
    img: "https://turnupdubai.com/wp-content/uploads/2025/03/03242-1.jpg",
    name: "Model Nina",
  },
];

const models = [
  {
    id: 1,
    first_name: "Tanya",
    last_name: "Verma",
    nationality: "Indian",
    age: 24,
    height_cm: 170,
    weight_kg: 55,
    skin_color: "Wheatish",
    relationship_status: "Single",
    eating_habits: "Non-Veg",
    religion: "Hindu",
    instagram_url: "https://instagram.com/tanya_v",
    whatsapp_number: "+911234567890",
    email: "tanya@example.com",
    img: "https://turnupdubai.com/wp-content/uploads/2025/03/03243-1.jpg",
    name: "Model Tanya",
    premium: false,
  },
  {
    id: 2,
    first_name: "Sophia",
    last_name: "Lee",
    nationality: "American",
    age: 27,
    height_cm: 165,
    weight_kg: 50,
    skin_color: "Fair",
    relationship_status: "In Relationship",
    eating_habits: "Vegan",
    religion: "None",
    instagram_url: "https://instagram.com/sophia_l",
    whatsapp_number: "+19876543210",
    email: "sophia@example.com",
    img: "https://cdn.pixabay.com/photo/2017/12/22/14/42/girl-3033718_1280.jpg",
    name: "Model Sophia",
    premium: true,
  },
  {
    id: 3,
    first_name: "Zara",
    last_name: "Khan",
    nationality: "Pakistani",
    age: 22,
    height_cm: 175,
    weight_kg: 60,
    skin_color: "Olive",
    relationship_status: "Single",
    eating_habits: "Non-Veg",
    religion: "Muslim",
    instagram_url: "https://instagram.com/zara_k",
    whatsapp_number: "+921122334455",
    email: "zara@example.com",
    img: "https://cdn.pixabay.com/photo/2016/07/09/19/20/girl-1506653_640.jpg",
    name: "Model Zara",
    premium: false,
  },
  {
    id: 4,
    first_name: "Nina",
    last_name: "Rodriguez",
    nationality: "Mexican",
    age: 29,
    height_cm: 168,
    weight_kg: 58,
    skin_color: "Tan",
    relationship_status: "In Relationship",
    eating_habits: "Vegetarian",
    religion: "Catholic",
    instagram_url: "https://instagram.com/nina_r",
    whatsapp_number: "+525512345678",
    email: "nina@example.com",
    img: "https://cdn.pixabay.com/photo/2025/07/31/20/00/woman-9747618_640.jpg",
    name: "Model Nina",
    premium: true,
  },
  {
    id: 5,
    first_name: "Ayesha",
    last_name: "Patel",
    nationality: "Indian",
    age: 26,
    height_cm: 172,
    weight_kg: 57,
    skin_color: "Fair",
    relationship_status: "Single",
    eating_habits: "Non-Veg",
    religion: "Hindu",
    instagram_url: "https://instagram.com/ayesha_p",
    whatsapp_number: "+919876543210",
    email: "ayesha@example.com",
    img: "https://turnupdubai.com/wp-content/uploads/2025/03/03246-1.jpg",
    name: "Model Ayesha",
    premium: true,
  },
  {
    id: 6,
    first_name: "Rhea",
    last_name: "Singh",
    nationality: "Indian",
    age: 23,
    height_cm: 167,
    weight_kg: 52,
    skin_color: "Wheatish",
    relationship_status: "Single",
    eating_habits: "Vegetarian",
    religion: "Hindu",
    instagram_url: "https://instagram.com/rhea_s",
    whatsapp_number: "+919812345678",
    email: "rhea@example.com",
    img: "https://turnupdubai.com/wp-content/uploads/2025/03/03247-1.jpg",
    name: "Model Rhea",
    premium: true,
  },
  {
    id: 7,
    first_name: "Lina",
    last_name: "Kaur",
    nationality: "Indian",
    age: 25,
    height_cm: 169,
    weight_kg: 54,
    skin_color: "Fair",
    relationship_status: "In Relationship",
    eating_habits: "Vegan",
    religion: "Sikh",
    instagram_url: "https://instagram.com/lina_k",
    whatsapp_number: "+919876543211",
    email: "lina@example.com",
    img: "https://cdn.pixabay.com/photo/2016/03/27/21/33/woman-1284347_640.jpg",
    name: "Model Lina",
    premium: false,
  },
  {
    id: 8,
    first_name: "Sophia",
    last_name: "Martinez",
    nationality: "Mexican",
    age: 28,
    height_cm: 166,
    weight_kg: 55,
    skin_color: "Tan",
    relationship_status: "Single",
    eating_habits: "Non-Veg",
    religion: "Catholic",
    instagram_url: "https://instagram.com/sophia_m",
    whatsapp_number: "+525512345679",
    email: "sophia.m@example.com",
    img: "https://cdn.pixabay.com/photo/2018/08/04/20/48/woman-3584435_640.jpg",
    name: "Model Sophia M",
    premium: true,
  },
  {
    id: 9,
    first_name: "Zoya",
    last_name: "Ali",
    nationality: "Pakistani",
    age: 24,
    height_cm: 174,
    weight_kg: 59,
    skin_color: "Olive",
    relationship_status: "Single",
    eating_habits: "Non-Veg",
    religion: "Muslim",
    instagram_url: "https://instagram.com/zoya_a",
    whatsapp_number: "+921122334456",
    email: "zoya@example.com",
    img: "https://cdn.pixabay.com/photo/2021/12/07/02/38/woman-6851973_640.jpg",
    name: "Model Zoya",
    premium: false,
  },
  {
    id: 10,
    first_name: "Nadia",
    last_name: "Fernandez",
    nationality: "Mexican",
    age: 27,
    height_cm: 170,
    weight_kg: 56,
    skin_color: "Tan",
    relationship_status: "In Relationship",
    eating_habits: "Vegetarian",
    religion: "Catholic",
    instagram_url: "https://instagram.com/nadia_f",
    whatsapp_number: "+525512345680",
    email: "nadia@example.com",
    img: "https://cdn.pixabay.com/photo/2024/06/19/08/18/woman-8839452_640.jpg",
    name: "Model Nadia",
    premium: true,
  },

  {
    id: 11,
    first_name: "Nina",
    last_name: "Rodriguez",
    nationality: "Mexican",
    age: 29,
    height_cm: 168,
    weight_kg: 58,
    skin_color: "Tan",
    relationship_status: "In Relationship",
    eating_habits: "Vegetarian",
    religion: "Catholic",
    instagram_url: "https://instagram.com/nina_r",
    whatsapp_number: "+525512345678",
    email: "nina@example.com",
    img: "https://cdn.pixabay.com/photo/2018/08/04/20/48/woman-3584435_640.jpg",
    name: "Model Nina",
    premium: true,
  },
  {
    id: 12,
    first_name: "Ayesha",
    last_name: "Patel",
    nationality: "Indian",
    age: 26,
    height_cm: 172,
    weight_kg: 57,
    skin_color: "Fair",
    relationship_status: "Single",
    eating_habits: "Non-Veg",
    religion: "Hindu",
    instagram_url: "https://instagram.com/ayesha_p",
    whatsapp_number: "+919876543210",
    email: "ayesha@example.com",
    img: "https://cdn.pixabay.com/photo/2022/02/15/18/04/woman-7015406_640.jpg",
    name: "Model Ayesha",
    premium: true,
  },
  {
    id: 13,
    first_name: "Rhea",
    last_name: "Singh",
    nationality: "Indian",
    age: 23,
    height_cm: 167,
    weight_kg: 52,
    skin_color: "Wheatish",
    relationship_status: "Single",
    eating_habits: "Vegetarian",
    religion: "Hindu",
    instagram_url: "https://instagram.com/rhea_s",
    whatsapp_number: "+919812345678",
    email: "rhea@example.com",
    img: "https://cdn.pixabay.com/photo/2017/05/12/08/27/gothic-2306457_640.jpg",
    name: "Model Rhea",
    premium: true,
  },
  {
    id: 14,
    first_name: "Lina",
    last_name: "Kaur",
    nationality: "Indian",
    age: 25,
    height_cm: 169,
    weight_kg: 54,
    skin_color: "Fair",
    relationship_status: "In Relationship",
    eating_habits: "Vegan",
    religion: "Sikh",
    instagram_url: "https://instagram.com/lina_k",
    whatsapp_number: "+919876543211",
    email: "lina@example.com",
    img: "https://cdn.pixabay.com/photo/2018/07/28/09/23/woman-3567600_640.jpg",
    name: "Model Lina",
    premium: false,
  },
  {
    id: 15,
    first_name: "Sophia",
    last_name: "Martinez",
    nationality: "Mexican",
    age: 28,
    height_cm: 166,
    weight_kg: 55,
    skin_color: "Tan",
    relationship_status: "Single",
    eating_habits: "Non-Veg",
    religion: "Catholic",
    instagram_url: "https://instagram.com/sophia_m",
    whatsapp_number: "+525512345679",
    email: "sophia.m@example.com",
    img: "https://cdn.pixabay.com/photo/2021/12/24/08/41/woman-6890711_640.jpg",
    name: "Model Sophia M",
    premium: true,
  },
];

// // Group models dynamically based on number per slide
// const groupModels = (arr, size) => {
//   const groups = [];
//   for (let i = 0; i < arr.length; i += size) {
//     groups.push(arr.slice(i, i + size));
//   }
//   return groups;
// };

export default function ModelsPage() {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    nationality: "",
    age: "",
    skin_color: "",
    relationship_status: "",
    eating_habits: "",
  });
  const [showPopup, setShowPopup] = useState(false);

  const user = JSON.parse(localStorage.getItem("user")) || {};

  // ---- Filter logic ----
  const filteredModels = models.filter((m) => {
    return (
      (filters.nationality ? m.nationality === filters.nationality : true) &&
      (filters.age ? m.age.toString() === filters.age : true) &&
      (filters.skin_color ? m.skin_color === filters.skin_color : true) &&
      (filters.relationship_status
        ? m.relationship_status === filters.relationship_status
        : true) &&
      (filters.eating_habits ? m.eating_habits === filters.eating_habits : true)
    );
  });

  const handleDetails = (model) => {
    if (!user || !user.isPremium) {
      setShowPopup(true);
      return;
    }
    navigate(`/models/${model.id}`);
  };

  return (
    <div className="models-page">
      <h2>Models (Premium Members Only)</h2>

      {/* -------- Filter Section -------- */}
      <div className="filter-bar">
        <select
          onChange={(e) => setFilters({ ...filters, nationality: e.target.value })}
        >
          <option value="">All Nationalities</option>
          {[...new Set(models.map((m) => m.nationality))].map((n) => (
            <option key={n}>{n}</option>
          ))}
        </select>

        <select onChange={(e) => setFilters({ ...filters, age: e.target.value })}>
          <option value="">All Ages</option>
          {[...new Set(models.map((m) => m.age))].map((age) => (
            <option key={age}>{age}</option>
          ))}
        </select>

        <select
          onChange={(e) => setFilters({ ...filters, skin_color: e.target.value })}
        >
          <option value="">All Skin Colors</option>
          {[...new Set(models.map((m) => m.skin_color))].map((color) => (
            <option key={color}>{color}</option>
          ))}
        </select>

        <select
          onChange={(e) =>
            setFilters({ ...filters, relationship_status: e.target.value })
          }
        >
          <option value="">All Relationship Status</option>
          {[...new Set(models.map((m) => m.relationship_status))].map((status) => (
            <option key={status}>{status}</option>
          ))}
        </select>

        <select
          onChange={(e) =>
            setFilters({ ...filters, eating_habits: e.target.value })
          }
        >
          <option value="">All Eating Habits</option>
          {[...new Set(models.map((m) => m.eating_habits))].map((food) => (
            <option key={food}>{food}</option>
          ))}
        </select>
      </div>

      {/* -------- Model Grid -------- */}
      <div className="models-grid">
        {filteredModels.map((model) => (
          <div className="model-card" key={model.id}>
            <img src={model.img} alt={model.name} />
            <h3>{model.name}</h3>
            <p>Nationality: {model.nationality}</p>
            <p>Age: {model.age}</p>
            <p>Height: {model.height_cm} cm</p>
            <p>Weight: {model.weight_kg} kg</p>
            <p>Skin: {model.skin_color}</p>
            <button onClick={() => handleDetails(model)}>View Details</button>
          </div>
        ))}
      </div>

      {/* -------- Popup for Non-Premium Users -------- */}
      {showPopup && (
        <div className="popup-overlay" onClick={() => setShowPopup(false)}>
          <div className="popup-box" onClick={(e) => e.stopPropagation()}>
            <h3>Sorry, only for premium members.</h3>
            <button onClick={() => setShowPopup(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}