import React, { useState } from "react";
import "./Articles.css";

const articleData = [
  {
    id: 1,
    title: "The Evolution of Nightlife in Mumbai",
    author: "Muskan Chauhan",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    category: "Entertainment",
    date: "October 5, 2025",
    readTime: "6 min read",
    trending: true,
    image:
      "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=60",
    video: "https://www.w3schools.com/html/mov_bbb.mp4",
    content:
      "Nightlife in Mumbai has evolved over the last decade with new clubs, DJs, and entertainment options for locals and tourists alike.",
  },
  {
    id: 2,
    title: "Behind the Scenes with Celebrity Chef Lorenzo",
    author: "Aarav Mehta",
    avatar: "https://randomuser.me/api/portraits/men/65.jpg",
    category: "Food",
    date: "September 28, 2025",
    readTime: "5 min read",
    trending: false,
    image:
      "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=800&q=60",
    content:
      "Chef Lorenzo redefines urban gourmet dining with his innovative cooking techniques and creative menu.",
  },
  {
    id: 3,
    title: "2025 Event Trends: What Promoters Need to Know",
    author: "Simran Kaur",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
    category: "Events",
    date: "August 15, 2025",
    readTime: "7 min read",
    trending: true,
    image:
      "https://images.unsplash.com/photo-1482062364825-616fd23b8fc1?auto=format&fit=crop&w=800&q=60",
    video: "https://www.w3schools.com/html/mov_bbb.mp4",
    content:
      "Hybrid events, VR experiences, and AI-powered audience engagement are redefining how promoters organize events.",
  },
];

const Articles = () => {
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [trendingFilter, setTrendingFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [bookmarkedArticles, setBookmarkedArticles] = useState([]);

  const toggleBookmark = (id) => {
    setBookmarkedArticles((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  };

  const filteredArticles = articleData.filter((article) => {
    const matchesCategory =
      categoryFilter === "All" || article.category === categoryFilter;
    const matchesTrending =
      trendingFilter === "All" ||
      (trendingFilter === "Trending" && article.trending);
    const matchesSearch =
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.content.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesTrending && matchesSearch;
  });

  return (
    <div className="articles-page">
      <header>
        <h1>Articles Hub</h1>
        <p>Deep insights, stories, and analysis from entertainment, food, and lifestyle</p>
      </header>

      {/* Filters & Search */}
      <section className="filters">
        <input
          type="text"
          placeholder="Search articles..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="All">All Categories</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Food">Food</option>
          <option value="Events">Events</option>
        </select>
        <select
          value={trendingFilter}
          onChange={(e) => setTrendingFilter(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Trending">Trending Only</option>
        </select>
      </section>

      {/* Article Cards */}
      <section className="featured-articles">
        {filteredArticles.map((article) => (
          <div
            className="article-card"
            key={article.id}
            onClick={() => setSelectedArticle(article)}
          >
            <img src={article.image} alt={article.title} />
            <div className="article-info">
              <div className="article-category">{article.category}</div>
              {article.trending && <div className="trending">🔥 Trending</div>}
              <h3>{article.title}</h3>
              <div className="author">
                <img src={article.avatar} alt={article.author} className="avatar" />
                <span>{article.author}</span>
              </div>
              <button
                className={`bookmark-btn ${bookmarkedArticles.includes(article.id) ? "active" : ""}`}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleBookmark(article.id);
                }}
              >
                {bookmarkedArticles.includes(article.id) ? "★ Bookmarked" : "☆ Bookmark"}
              </button>
            </div>
          </div>
        ))}
      </section>

      {/* Modal */}
      {selectedArticle && (
        <div className="modal" onClick={() => setSelectedArticle(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close" onClick={() => setSelectedArticle(null)}>
              &times;
            </span>
            <img
              src={selectedArticle.image}
              alt={selectedArticle.title}
              className="modal-img"
            />
            {selectedArticle.video && (
              <video
                src={selectedArticle.video}
                controls
                className="modal-video"
              />
            )}
            <h2>{selectedArticle.title}</h2>
            <p className="author">
              <img src={selectedArticle.avatar} alt={selectedArticle.author} className="avatar" />
              {selectedArticle.author} • {selectedArticle.date} • {selectedArticle.readTime}
            </p>
            <p className="content">{selectedArticle.content}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Articles;
