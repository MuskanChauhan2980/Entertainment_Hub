import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import "./Blog.css";

const featuredPosts = [
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
    readMore:
      "Behind every seamless DJ set is an intricate balance of timing, psychology, and intuition. Successful DJs don’t just play songs—they create journeys. The best ones read micro-expressions in the crowd, notice shifts in body language, and respond instantly through their music. A well-timed beat drop or a slow build-up can completely transform the room’s energy. \n\nTechnology has also reshaped the art of DJing. From vinyl records to digital controllers and AI-assisted beat matching, today’s DJs have endless tools at their disposal. Yet, the essence remains human—the emotional connection between the performer and the audience. What separates a good DJ from a great one isn’t just skill but the ability to understand and influence mood. When sound, lights, and emotion merge, the night becomes more than music—it becomes memory."
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
    readMore:
      "Artificial Intelligence has entered the studio, not to replace creativity, but to expand it. Producers now use AI platforms to generate melodies, chord progressions, or even entire tracks within minutes. These systems analyze massive datasets of music to understand genres, moods, and patterns, enabling musicians to experiment freely without starting from scratch. \n\nWhile some fear AI might dilute originality, many artists see it as a collaborator. It removes technical barriers, allowing musicians to focus on emotion and storytelling. The real innovation lies in how humans and algorithms work together—turning inspiration into sound at lightning speed. The future of music may not be fully human or machine, but a perfect harmony between both."
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
    readMore:
      "In 2025, dining isn’t just about taste—it’s about experience. Restaurants have become stages, and chefs are the directors of multisensory performances. From live cooking stations to music synchronized with each course, the dining experience has transformed into theater. Guests are invited to feel, listen, and even interact with their food in creative ways. \n\nSome establishments use projection mapping to tell a story through visuals on the plate. Others pair dishes with soundscapes that enhance flavor perception—like pairing ocean sounds with seafood. These experiences blur the line between food and art. As technology evolves, the culinary world continues to redefine entertainment, offering guests not just meals, but memories they can taste."
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
    readMore:
      "Behind every seamless DJ set is an intricate balance of timing, psychology, and intuition. Successful DJs don’t just play songs—they create journeys. The best ones read micro-expressions in the crowd, notice shifts in body language, and respond instantly through their music. A well-timed beat drop or a slow build-up can completely transform the room’s energy. \n\nTechnology has also reshaped the art of DJing. From vinyl records to digital controllers and AI-assisted beat matching, today’s DJs have endless tools at their disposal. Yet, the essence remains human—the emotional connection between the performer and the audience. What separates a good DJ from a great one isn’t just skill but the ability to understand and influence mood. When sound, lights, and emotion merge, the night becomes more than music—it becomes memory."
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
    readMore:
      "Artificial Intelligence has entered the studio, not to replace creativity, but to expand it. Producers now use AI platforms to generate melodies, chord progressions, or even entire tracks within minutes. These systems analyze massive datasets of music to understand genres, moods, and patterns, enabling musicians to experiment freely without starting from scratch. \n\nWhile some fear AI might dilute originality, many artists see it as a collaborator. It removes technical barriers, allowing musicians to focus on emotion and storytelling. The real innovation lies in how humans and algorithms work together—turning inspiration into sound at lightning speed. The future of music may not be fully human or machine, but a perfect harmony between both."
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
    readMore:
      "In 2025, dining isn’t just about taste—it’s about experience. Restaurants have become stages, and chefs are the directors of multisensory performances. From live cooking stations to music synchronized with each course, the dining experience has transformed into theater. Guests are invited to feel, listen, and even interact with their food in creative ways. \n\nSome establishments use projection mapping to tell a story through visuals on the plate. Others pair dishes with soundscapes that enhance flavor perception—like pairing ocean sounds with seafood. These experiences blur the line between food and art. As technology evolves, the culinary world continues to redefine entertainment, offering guests not just meals, but memories they can taste."
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
    readMore:
      "Street food is the heart of a city’s culture. Every bite carries history—recipes passed down for generations, perfected not in culinary schools but in open-air markets. Unlike fine dining, street food thrives on simplicity and soul. It represents community, affordability, and the comfort of shared experiences. \n\nThe reason these humble stalls often surpass high-end restaurants lies in emotion. People don’t just eat; they relive memories. The familiar aroma of samosas, the sizzling of kebabs, or the sweetness of jalebi connects people to home. In an age of globalization, street food remains authentic and real, reminding us that the most powerful flavor is nostalgia."
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
    readMore:
      "2025 has brought a new era of culinary innovation. From Tokyo’s futuristic sushi bars to Italy’s farm-to-table vineyards, chefs are blending tradition with technology like never before. The trend toward sustainability and local sourcing is shaping restaurant culture, making eco-conscious dining both luxurious and accessible. \n\nAmong the top destinations this year are Paris’s ‘Lumière’, known for its AI-assisted wine pairing, and Bali’s ‘Aqua Soul’, where meals are served underwater in glass domes. In New York, rooftop restaurants are redefining fine dining with views as breathtaking as their tasting menus. Whether you’re a food explorer or a casual diner, 2025’s culinary scene promises experiences that engage all senses."
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
    readMore:
      "Event organizers in 2025 are embracing a new philosophy: engagement over attendance. The post-pandemic world accelerated the rise of hybrid experiences, merging physical venues with digital audiences. Fans can now interact in real time from anywhere through VR, AR, and social integration tools. \n\nData plays a vital role in crafting these experiences. From analyzing attendee behavior to predicting engagement patterns, AI helps promoters design events that feel personal and dynamic. The future belongs to immersive storytelling—events that don’t just entertain but connect emotionally, blurring the line between performer and participant."
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
    readMore:
      "Sustainability is no longer just a trend—it’s a movement reshaping the nightlife industry. In 2025, eco-conscious clubs are using renewable energy, water-saving systems, and zero-plastic policies to redefine what it means to party responsibly. Venues in Berlin, Amsterdam, and Mumbai are leading the charge with dance floors powered by kinetic energy generated from the crowd’s movement. \n\nThis shift isn’t only environmental but cultural. Guests today value experiences that align with their ethics. Green clubs demonstrate that luxury and responsibility can coexist—where neon lights meet solar panels, and music fuels both joy and sustainability. It’s proof that every beat can leave a positive footprint."
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
    readMore:
      "The definition of relaxation has evolved in the digital age. From mindfulness apps that track breathing patterns to virtual reality getaways that transport users to tropical beaches, technology is personalizing leisure like never before. People now meditate with headsets, attend remote fitness classes, and even experience AI-guided therapy. \n\nIronically, the same devices that cause stress are now helping manage it. Tech-powered relaxation focuses on balance—integrating digital wellness with mindfulness. As innovations continue, the line between technology and tranquility will keep blurring, making well-being smarter, more accessible, and deeply personal."
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
    readMore:
      "Urban lounges have become the new sanctuaries for modern professionals. Designed with soft lighting, neutral palettes, and ergonomic comfort, they offer an escape from the city’s chaos without leaving it. These lounges fuse art, design, and sensory experiences to create calm yet luxurious atmospheres. \n\nThe rise of urban lounges reflects a broader shift in lifestyle priorities—people crave comfort with sophistication. Whether it’s rooftop lounges with panoramic views or intimate indoor spaces with curated soundscapes, the trend celebrates mindful luxury. It’s less about extravagance and more about emotional well-being in an overstimulated world."
  }
];

const Blog = () => {
  const navigate = useNavigate();
  const location = useLocation();
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

  // Handle Read More click
 const handleReadMore = (post) => {
  if (user && user.isSignup) {
     setSelectedPost(post);  // go to article page
  } else {
    navigate("/", { state: { fromPostId: post.id } });  // redirect to signup
  }
};



  useEffect(() => {
    const postId = location.state?.postId;
    if (postId) {
      const post = allPosts.find((p) => p.id === postId);
      if (post) setSelectedPost(post);
    }
  }, [location.state]);

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
            onClick={() => handleReadMore(currentPost)}
          />
          <div className="featured-info">
            <h2>{currentPost.title}</h2>
            <p>{currentPost.summary}</p>
            <button onClick={() => handleReadMore(currentPost)}>
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
            onClick={() => handleReadMore(post)

            }
          >
            <img src={post.image} alt={post.title} />
            <div className="blog-info">
              <h3>{post.title}</h3>
              <p>{post.summary}</p>
              <span className="meta">
                {post.author} • {post.date} • {post.category}
              </span>
            <button
              className="join-btn"
              onClick={() => handleReadMore(selectedPost)}
            >
              Read More
            </button>
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
            <p className="content">{selectedPost.readMore}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Blog;
