 import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Restaurants from "./pages/Restaurants";
import Home from "./pages/Home"; // Your current home page component
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/restaurants" element={<Restaurants />} />
      </Routes>
    </Router>
  );
}

export default App;
