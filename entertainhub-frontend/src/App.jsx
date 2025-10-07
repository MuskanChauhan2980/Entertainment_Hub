 import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Restaurants from "./pages/Restaurants";
import Blog from "./pages/Blog";
import Home from "./pages/Home"; 
import Articles from "./pages/Articles"; 
import Event from "./pages/Events"
import Signup from "./pages/signup";
import Login from "./pages/login";
import EventDetails from "./pages/EventDetails";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/" element={<Home />} />
        <Route path="/restaurants" element={<Restaurants />} />
        <Route path="/blog" element={<Blog/>}/> 
        <Route path="/article" element={<Articles/>}/> 
        <Route path ="/event" element={<Event/>}/>
        <Route path="/events/:id" element={<EventDetails />} />

      </Routes>
    </Router>
  );
}

export default App;
