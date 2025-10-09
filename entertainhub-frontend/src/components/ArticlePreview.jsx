import React from "react";
import "./Preview.css";

const ArticlePreview = ({ articles=[] }) => {
  return (
    <div className="preview-container">
      {articles.slice(0, 3).map((article, index) => (
        <div className="preview-card" key={index}>
          <img src={article.img} alt={article.title} />
          <div className="preview-content">
            <h4>{article.title}</h4>
            <p>{article.desc}</p>
          </div>
        </div>
      ))}
      <button className="view-all-btn">View All Articles</button>
    </div>
  );
};

export default ArticlePreview;
