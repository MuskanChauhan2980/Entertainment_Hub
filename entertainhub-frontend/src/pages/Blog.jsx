import React from "react";

const blogs = [
  { title: "Top 10 Nightclubs to Visit", snippet: "Discover the hottest spots for nightlife in your city..." },
  { title: "Summer Music Festival Guide", snippet: "Everything you need to know to enjoy the festivals this season..." },
  { title: "Interview with DJ Ayesha", snippet: "Insights from one of the top DJs in the country..." },
];

const Blog = () => {
  return (
    <div className="section">
      <h2>📝 Blog</h2>
      <ul>
        {blogs.map((blog, index) => (
          <li key={index}>
            <strong>{blog.title}</strong> - {blog.snippet}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Blog;
