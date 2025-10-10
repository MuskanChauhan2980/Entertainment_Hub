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
import ArticleDetails from "./pages/ArticleDetails";
import ModelsPage from "./pages/ModelsPage";
import VerifyOTP from "./pages/verifyOTP";
import CalendarPage from "./pages/CalendarPage";
import ModelDetails from "./pages/ModelDetails";
import SecurePayment from "./pages/premium";
import PremiumPage from "./pages/PremiumPage";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/verify-otp" element={<VerifyOTP/>}/>
        <Route path="/home" element={<Home />} />
        <Route path="/restaurants" element={<Restaurants />} />
        <Route path="/blog" element={<Blog/>}/> 
        <Route path="/article" element={<Articles/>}/> 
        <Route path ="/event" element={<Event/>}/>
        <Route path="/events/:id" element={<EventDetails />} />
        <Route path="/articles/:id" element={<ArticleDetails />} />
<Route path="/models" element={<ModelsPage />} />
<Route path="/models/:id" element={<ModelDetails />} />
  <Route path="/calendar" element={<CalendarPage />} />
<Route path="/premium" element={<PremiumPage />} />
      </Routes>
    </Router>
  );
}

export default App;
