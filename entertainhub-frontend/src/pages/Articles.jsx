 import React, { useState } from "react";
import "./Articles.css";
import { useNavigate } from "react-router-dom";

const articleData = [
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
    image:"https://cdn.media.amplience.net/i/kerzner/frantzen-Bjorn Frantzen",
    description: "Chef Ananya is redefining Indian cuisine with her innovative and modern recipes.",
  },
  {
    id: 3,
    title: "Luxury Lounge – Mumbai's Top Venue",
    author: "Simran Kaur",
    avatar: "https://randomuser.me/api/portraits/women/45.jpg",
    category: "Company/Venue",
    date: "August 25, 2025",
    readTime: "6 min read",
    trending: true,
    image: "https://cdn.media.amplience.net/i/kerzner/siro-brandcampaign-haya_yoga_room--4881",
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
    image: "https://cdn.media.amplience.net/i/kerzner/BAS_DesertPoolVillaLifestyle2025_4885",
    description: "Discover new cocktail recipes to impress your guests at your next party or event.",
  },
  {
    id: 7,
    title: "Social & Casual Dining Spots in Dubai",
    author: "Ananya Sharma",
    avatar: "https://randomuser.me/api/portraits/women/22.jpg",
    category: "Company/Venue",
    date: "October 1, 2025",
    readTime: "5 min read",
    trending: true,
    image: "https://images.unsplash.com/photo-1548946526-f69e2424cf45?auto=format&fit=crop&w=800&q=60",
    description: "Explore relaxed dining spots in Dubai offering a variety of cuisines for all tastes.",
  },
  {
    id: 8,
    title: "Celebrity Chef Restaurants in Dubai",
    author: "Rohan Mehta",
    avatar: "https://randomuser.me/api/portraits/men/42.jpg",
    category: "People Feature",
    date: "September 28, 2025",
    readTime: "6 min read",
    trending: false,
    image: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=800&q=60",
    description: "Dubai brings together a collection of restaurants helmed by renowned celebrity chefs.",
  },
  {
    id: 9,
    title: "Beach Clubs & Pool Bars – Dubai Guide",
    author: "Muskan Chauhan",
    avatar: "https://randomuser.me/api/portraits/women/28.jpg",
    category: "Blog",
    date: "August 18, 2025",
    readTime: "5 min read",
    trending: true,
    image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=800&q=60",
    description: "Relax at Dubai's chic beach clubs and pool bars with the best day-to-night experiences.",
  },
  {
    id: 10,
    title: "Live Music Venues You Must Visit",
    author: "Aarav Mehta",
    avatar: "https://randomuser.me/api/portraits/men/37.jpg",
    category: "Company/Venue",
    date: "July 25, 2025",
    readTime: "6 min read",
    trending: false,
    image: "https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2?auto=format&fit=crop&w=800&q=60",
    description: "Experience live music at top-rated venues with electrifying atmospheres.",
  },
  {
    id: 11,
    title: "Innovative Party Themes for 2025",
    author: "Simran Kaur",
    avatar: "https://randomuser.me/api/portraits/women/50.jpg",
    category: "Blog",
    date: "August 10, 2025",
    readTime: "5 min read",
    trending: true,
    image: "https://cdn.media.amplience.net/i/kerzner/roam-home-media-image",
    description: "Creative and unique party theme ideas for your next big celebration.",
  },
  {
    id: 12,
    title: "The Best Rooftop Bars in Mumbai",
    author: "Rohan Mehta",
    avatar: "https://randomuser.me/api/portraits/men/44.jpg",
    category: "Company/Venue",
    date: "July 5, 2025",
    readTime: "6 min read",
    trending: false,
    image: "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?auto=format&fit=crop&w=800&q=60",
    description: "Discover rooftop bars in Mumbai offering breathtaking views and signature cocktails.",
  },
];

const Articles = () => {
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [trendingFilter, setTrendingFilter] = useState("All");
  const [authorFilter, setAuthorFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [bookmarkedArticles, setBookmarkedArticles] = useState([]);
  const navigate = useNavigate();

  const toggleBookmark = (id) => {
    setBookmarkedArticles((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };



 

const handleReadMore = (article) => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user || !user.isSignup) {
    navigate("/signup");
  } else {
    navigate(`/articles/${article.id}`);
  }
};


  const filteredArticles = articleData.filter((article) => {
    const matchesCategory = categoryFilter === "All" || article.category === categoryFilter;
    const matchesTrending = trendingFilter === "All" || (trendingFilter === "Trending" && article.trending);
    const matchesAuthor = authorFilter === "All" || article.author === authorFilter;
    const matchesSearch =
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.author.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesTrending && matchesAuthor && matchesSearch;
  });

  const authors = ["All", ...new Set(articleData.map((a) => a.author))];

  return (
    <div className="articles-page">
      <header>
        <h1>Articles Hub</h1>
        <p>Deep insights, stories, and analysis from industry professionals, venues, and trends.</p>
      </header>

      <section className="filters">
        <input
          type="text"
          placeholder="Search by title, description, or author..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </section>

      <section className="filter-buttons-wrapper">
        <div className="filter-buttons">
          {["All", "People Feature", "Company/Venue", "Blog"].map((cat) => (
            <button
              key={cat}
              className={`filter-button ${categoryFilter === cat ? "active" : ""}`}
              onClick={() => setCategoryFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="filter-buttons">
          {["All", "Trending"].map((trend) => (
            <button
              key={trend}
              className={`filter-button ${trendingFilter === trend ? "active" : ""}`}
              onClick={() => setTrendingFilter(trend)}
            >
              {trend}
            </button>
          ))}
        </div>

        <div className="filter-buttons">
          {authors.map((author) => (
            <button
              key={author}
              className={`filter-button ${authorFilter === author ? "active" : ""}`}
              onClick={() => setAuthorFilter(author)}
            >
              {author}
            </button>
          ))}
        </div>
      </section>

      <section className="featured-articles">
        {filteredArticles.map((article) => (
          <div
            key={article.id}
            className={`article-card ${article.category === "People Feature" ? "people-feature" : article.category === "Company/Venue" ? "company-venue" : "blog"}`}
          >
            <img
              src={article.image}
              alt={article.title}
            />
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
                onClick={(e) => { e.stopPropagation(); toggleBookmark(article.id); }}
              >
                {bookmarkedArticles.includes(article.id) ? "★ Bookmarked" : "☆ Bookmark"}
              </button>
              <button className="read-more-btn" onClick={() =>  handleReadMore(article)}>Read More</button>
            </div>
          </div>
        ))}
      </section>
    </div>
    
  );
};

export default Articles;
