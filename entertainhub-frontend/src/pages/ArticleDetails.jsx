import { useParams, useNavigate } from "react-router-dom";
import articleData from "./ArticleData";
import "./ArticleDetails.css";

function ArticleDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const article = articleData.find((item) => item.id === parseInt(id));

  if (!article) return <div className="p-10 text-center text-xl font-semibold">Article not found.</div>;

  // Optional: Redirect if user is not signed in
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user || !user.isSignup) {
    navigate("/signup");
    return null;
  }

  return (
    <div className="article-details-page">
      <div className="article-container">
        <img src={article.image} alt={article.title} />
        <h1>{article.title}</h1>
        <div className="author-info">
          <img src={article.avatar} alt={article.author} />
          <span>{article.author} • {article.date} • {article.readTime}</span>
        </div>
        <div className="story">{article.readMore}</div>
        <button className="back-btn" onClick={() => navigate(-1)}>← Back</button>
      </div>
    </div>
  );
}

export default ArticleDetails;
