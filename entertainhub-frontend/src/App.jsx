 import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Restaurants from "./pages/Restaurants";
import Blog from "./pages/Blog";
import Home from "./pages/Home"; 
import Articles from "./pages/Articles"; 
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/restaurants" element={<Restaurants />} />
        <Route path="/blog" element={<Blog/>}/> 
        <Route path="/article" element={<Articles/>}/> 
      </Routes>
    </Router>
  );
}

export default App;
