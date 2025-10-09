import React from "react";
import "./Preview.css";

const BlogPreview = ({ blogs=[] }) => {
  return (
    <div className="preview-container">
      {blogs.slice(0, 3).map((blog, index) => (
        <div className="preview-card" key={index}>
          <img src={blog.img} alt={blog.title} />
          <div className="preview-content">
            <h4>{blog.title}</h4>
            <p>{blog.desc}</p>
          </div>
        </div>
      ))}
      <button className="view-all-btn">View All Blogs</button>
    </div>
  );
};

export default BlogPreview;
