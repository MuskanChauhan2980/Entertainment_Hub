import React, { useState } from "react";
import "./Articles.css";

const articleData = [
  // People Features
  {
    id: 1,
    title: "Meet DJ Rohan – The Party Starter",
    author: "Muskan Chauhan",
    avatar: "https://randomuser.me/api/portraits/men/21.jpg",
    category: "People Feature",
    date: "October 7, 2025",
    readTime: "5 min read",
    trending: true,
    image: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&w=800&q=60",
    description: "DJ Rohan has been igniting dance floors across India with his signature beats.",
  },
  {
    id: 2,
    title: "Celebrity Chef Ananya – Culinary Genius",
    author: "Aarav Mehta",
    avatar: "https://randomuser.me/api/portraits/women/32.jpg",
    category: "People Feature",
    date: "September 30, 2025",
    readTime: "6 min read",
    trending: false,
    image: "https://images.unsplash.com/photo-1543353071-087092ec3938?auto=format&fit=crop&w=800&q=60",
    description: "Chef Ananya is redefining Indian cuisine with her innovative and modern recipes.",
  },

  // Company/Venue Focused Articles
  {
    id: 3,
    title: "Luxury Lounge – Mumbai's Top Venue",
    author: "Simran Kaur",
    avatar: "https://randomuser.me/api/portraits/women/45.jpg",
    category: "Company/Venue",
    date: "August 25, 2025",
    readTime: "6 min read",
    trending: true,
    image: "https://images.unsplash.com/photo-1559862932-1f7df0c5e6a7?auto=format&fit=crop&w=800&q=60",
    description: "Luxury Lounge sets the benchmark for nightlife with its exquisite interiors and top-tier service.",
  },
  {
    id: 4,
    title: "The Royal Banquet Hall – Delhi's Elite Spot",
    author: "Rohan Mehta",
    avatar: "https://randomuser.me/api/portraits/men/40.jpg",
    category: "Company/Venue",
    date: "September 15, 2025",
    readTime: "7 min read",
    trending: false,
    image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=800&q=60",
    description: "A perfect venue for luxury events, weddings, and corporate parties in Delhi.",
  },

  // Blog/SEO Articles
  {
    id: 5,
    title: "Top 10 Nightlife Spots in Delhi",
    author: "Simran Kaur",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
    category: "Blog",
    date: "August 20, 2025",
    readTime: "4 min read",
    trending: false,
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=60",
    description: "A curated list of must-visit nightlife spots in Delhi for party lovers.",
  },
  {
    id: 6,
    title: "5 Innovative Cocktail Recipes for 2025",
    author: "Aarav Mehta",
    avatar: "https://randomuser.me/api/portraits/men/33.jpg",
    category: "Blog",
    date: "July 30, 2025",
    readTime: "5 min read",
    trending: true,
    image: "https://images.unsplash.com/photo-1580894908361-6c2a5b7e23c4?auto=format&fit=crop&w=800&q=60",
    description: "Discover new cocktail recipes to impress your guests at your next party or event.",
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
      article.description?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesTrending && matchesSearch;
  });

  return (
    <div className="articles-page">
      <header>
        <h1>Articles Hub</h1>
        <p>Deep insights, stories, and analysis from industry professionals, venues, and trends.</p>
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
          <option value="People Feature">People Feature</option>
          <option value="Company/Venue">Company/Venue</option>
          <option value="Blog">Blog</option>
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
            className={`article-card ${article.category === "People Feature" ? "people-feature" : ""}`}
            key={article.id}
            onClick={() => setSelectedArticle(article)}
          >
            <img src={article.image} alt={article.title} />
            <div className="article-info">
              <div className="article-category">{article.category}</div>
              {article.trending && <div className="trending">🔥 Trending</div>}
              <h3>{article.title}</h3>
              {article.description && <p className="description">{article.description}</p>}
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
            {selectedArticle.description && <p className="description">{selectedArticle.description}</p>}
            {selectedArticle.content && <p className="content">{selectedArticle.content}</p>}
          </div>
        </div>
      )}
    </div>
  );
};

export default Articles;
