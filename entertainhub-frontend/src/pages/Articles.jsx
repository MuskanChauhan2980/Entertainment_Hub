import React from "react";

const articles = [
  { title: "History of Nightclubs", snippet: "Explore how nightclubs evolved over the years..." },
  { title: "Music Trends 2025", snippet: "The latest music trends dominating the scene..." },
  { title: "Top DJs to Follow", snippet: "A guide to the most influential DJs this year..." },
];

const Articles = () => {
  return (
    <div className="section">
      <h2>📚 Articles</h2>
      <ul>
        {articles.map((article, index) => (
          <li key={index}>
            <strong>{article.title}</strong> - {article.snippet}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Articles;
