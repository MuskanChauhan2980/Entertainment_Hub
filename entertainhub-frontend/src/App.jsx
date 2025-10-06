 import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Events from "./pages/Events";
import Blog from "./pages/Blog";
import Articles from "./pages/Articles";
import "./App.css";

function App() {
  return (
    <Router>
      <header>
        <h1>Entertainment Hub</h1>
        <nav>
          <Link className="nav-link" to="/">Home</Link>
          <Link className="nav-link" to="/events">Events</Link>
          <Link className="nav-link" to="/blog">Blog</Link>
          <Link className="nav-link" to="/articles">Articles</Link>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/articles" element={<Articles />} />
      </Routes>

      <footer>
        © 2025 Entertainment Hub | Designed by Muskan Chauhan
      </footer>
    </Router>
  );
}

export default App;
