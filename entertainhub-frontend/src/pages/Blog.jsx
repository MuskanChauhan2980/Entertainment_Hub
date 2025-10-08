import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "./Blog.css";

const featuredPosts = [
  {
    id: 1,
    title: "The Future of Entertainment in 2025",
    author: "Muskan Chauhan",
    category: "Trends",
    date: "October 6, 2025",
    image:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=60",
    summary:
      "Explore how AI and technology are transforming the entertainment industry — from interactive music to smart venues.",
    content:
      "As the world becomes more digital, entertainment experiences are blending physical and virtual spaces. AI-driven personalization, VR concerts, and real-time audience engagement are redefining how people connect with content.",
  },
  {
    id: 2,
    title: "Inside the Mind of a DJ: Crafting the Perfect Night",
    author: "Aarav Mehta",
    category: "Music",
    date: "September 21, 2025",
    image:
      "https://images.unsplash.com/photo-1487180144351-b8472da7d491?auto=format&fit=crop&w=800&q=60",
    summary:
      "Discover what goes into creating unforgettable nights — from track selection to reading the crowd.",
    content:
      "DJs are modern-day storytellers, weaving emotions through music. Each set is carefully curated, balancing tempo, genre, and audience energy.",
  },
  {
    id: 3,
    title: "Culinary Art Meets Entertainment",
    author: "Chef Lorenzo",
    category: "Food",
    date: "August 30, 2025",
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=60",
    summary:
      "Explore how fine dining has evolved into a complete entertainment experience.",
    content:
      "Restaurants today go beyond food — they create immersive environments where every element, from lighting to music, contributes to storytelling.",
  },
];

const allPosts = [
  // 🎤 MUSIC
  {
    id: 1,
    title: "Inside the Mind of a DJ: Crafting the Perfect Night",
    author: "Aarav Mehta",
    category: "Music",
    date: "Sept 21, 2025",
    image:
      "https://images.unsplash.com/photo-1487180144351-b8472da7d491?auto=format&fit=crop&w=800&q=60",
    summary:
      "Discover what goes into creating unforgettable nights — from track selection to reading the crowd.",
    content:
      "DJs are storytellers, curating emotions through sound and rhythm. Learn how they read the room and craft each moment.",
  },
  {
    id: 2,
    title: "How AI is Changing Music Production",
    author: "Riya Sen",
    category: "Music",
    date: "July 15, 2025",
    image:
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=60",
    summary:
      "AI tools like Soundful and Amper are transforming how producers create beats and melodies.",
    content:
      "Machine learning is reshaping sound design, automating repetitive tasks and enabling unique compositions.",
  },

  // 🍽️ FOOD / RESTAURANTS
  {
    id: 3,
    title: "Culinary Art Meets Entertainment",
    author: "Chef Lorenzo",
    category: "Restaurants",
    date: "Aug 30, 2025",
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=60",
    summary:
      "Explore how fine dining has evolved into immersive entertainment experiences.",
    content:
      "Modern dining merges flavors with performance — creating unforgettable sensory journeys.",
  },
  {
    id: 4,
    title: "The Secret Behind Street Food Fame",
    author: "Rohit Verma",
    category: "Food",
    date: "July 12, 2025",
    image:
      "https://images.unsplash.com/photo-1543353071-873f17a7a088?auto=format&fit=crop&w=800&q=60",
    summary:
      "Why local street food stalls often outperform fancy restaurants in popularity.",
    content:
      "It’s not just about taste — it’s about connection, nostalgia, and authenticity.",
  },
  {
    id: 5,
    title: "Top 10 Restaurants to Visit in 2025",
    author: "Muskan Chauhan",
    category: "Restaurants",
    date: "Oct 6, 2025",
    image:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=60",
    summary:
      "From coastal cafes to rooftop bars — discover this year's best places to dine.",
    content:
      "Experience luxury, flavor, and innovation across the world's most inspiring restaurants.",
  },

  // 🎉 EVENTS / NIGHTLIFE
  {
    id: 6,
    title: "2025 Event Trends: What Promoters Need to Know",
    author: "Simran Kaur",
    category: "Events",
    date: "Sept 3, 2025",
    image: "https://cdn.media.amplience.net/i/kerzner/Al hadheerah-499 (1)",
    summary:
      "Hybrid events and interactive experiences are redefining nightlife and entertainment.",
    content:
      "The next wave of events is social, digital, and data-driven — powered by tech and creativity.",
  },
  {
    id: 7,
    title: "Sustainable Nightlife: A Green Revolution",
    author: "Ananya Sharma",
    category: "Events",
    date: "June 28, 2025",
    image:
      "https://images.unsplash.com/photo-1541417904950-b855846fe074?auto=format&fit=crop&w=800&q=60",
    summary:
      "Eco-friendly clubs and venues are proving sustainability can also be stylish.",
    content:
      "From reusable cups to energy-efficient lighting, the entertainment industry is going green.",
  },

  // 💫 LIFESTYLE
  {
    id: 8,
    title: "How Tech Influences Modern Leisure",
    author: "Arjun Patel",
    category: "Lifestyle",
    date: "May 5, 2025",
    image:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=60",
    summary:
      "Technology has changed how we relax, from virtual yoga to digital detox retreats.",
    content:
      "Wellness is now digital — personalized experiences guided by AI-driven health apps.",
  },
  {
    id: 9,
    title: "Luxury Meets Comfort: The Rise of Urban Lounges",
    author: "Priya Nair",
    category: "Lifestyle",
    date: "Apr 15, 2025",
    image:
      "https://cdn.media.amplience.net/i/kerzner/One&Only_ThePalm_Safina_Bar_Loungers-0001-29_MASTER_V2",
    summary:
      "Urban lounges redefine relaxation by combining minimalism with high-end comfort.",
    content:
      "Modern spaces are blending art, light, and sound to create stress-free atmospheres.",
  },
];

const Blog = () => {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const [selectedPost, setSelectedPost] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [autoPlayProgress, setAutoPlayProgress] = useState(0);

  // Auto-slider
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % featuredPosts.length);
      setAutoPlayProgress(0);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

 const user = JSON.parse(localStorage.getItem("user"));

const handleReadMore = (post) => {
  if (user && user.isSignup) {
    setSelectedPost(post); // show full content
  } else {
    navigate("/signup", { state: { fromPostId: post.id } }); // redirect to signup
  }
};


  // Progress bar animation
  useEffect(() => {
    const timer = setInterval(() => {
      setAutoPlayProgress((prev) => (prev < 100 ? prev + 1 : 0));
    }, 40);
    return () => clearInterval(timer);
  }, []);

  const filteredPosts =
    categoryFilter === "All"
      ? allPosts
      : allPosts.filter((p) => p.category === categoryFilter);

  const nextSlide = () => setCurrent((current + 1) % featuredPosts.length);
  const prevSlide = () =>
    setCurrent((current - 1 + featuredPosts.length) % featuredPosts.length);

  const currentPost = featuredPosts[current];

  return (
    <div className="blog-page">
      <header>
        <h1>Entertainment Hub Blog</h1>
        <p>Stories, insights, and updates from the entertainment world</p>
      </header>

      {/* Featured Blog Slider */}
      <section className="featured-blog">
        <div className="slider-container">
          <img
            src={currentPost.image}
            alt={currentPost.title}
            className="fade"
            onClick={() => setSelectedPost(currentPost)}
          />
          <div className="featured-info">
            <h2>{currentPost.title}</h2>
            <p>{currentPost.summary}</p>
            <button onClick={() => setSelectedPost(currentPost)}>
              Read More
            </button>
          </div>
          <button className="nav-btn prev" onClick={prevSlide}>
            ❮
          </button>
          <button className="nav-btn next" onClick={nextSlide}>
            ❯
          </button>
          <div
            className="progress-bar"
            style={{ width: `${autoPlayProgress}%` }}
          ></div>
        </div>
      </section>

      {/* Category Filter Buttons */}
      <section className="filter-buttons">
        {["All", "Music", "Food", "Restaurants", "Events", "Lifestyle"].map(
          (cat) => (
            <button
              key={cat}
              className={categoryFilter === cat ? "active" : ""}
              onClick={() => setCategoryFilter(cat)}
            >
              {cat}
            </button>
          )
        )}
      </section>

      {/* Blog Grid */}
      <section className="blog-grid">
        {filteredPosts.map((post) => (
          <div
            key={post.id}
            className="blog-card"
            onClick={() => setSelectedPost(post)}
          >
            <img src={post.image} alt={post.title} />
            <div className="blog-info">
              <h3>{post.title}</h3>
              <p>{post.summary}</p>
              <span className="meta">
                {post.author} • {post.date} • {post.category}
              </span>
            </div>
          </div>
        ))}
      </section>

      {/* Modal Popup */}
      {selectedPost && (
        <div className="modal" onClick={() => setSelectedPost(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close" onClick={() => setSelectedPost(null)}>
              &times;
            </span>
            <img
              src={selectedPost.image}
              alt={selectedPost.title}
              className="modal-img"
            />
            <h2>{selectedPost.title}</h2>
            <p className="meta">
              {selectedPost.author} • {selectedPost.date} •{" "}
              {selectedPost.category}
            </p>
            <p className="content">{selectedPost.content}</p>
            <button
              className="join-btn"
              onClick={() =>   {handleReadMore()}}
            >
              Read More
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Blog;
