import React from "react";

/**
 * NewsCard Component - Modern news article card
 */
const NewsCard = ({ article, index = 0 }) => {
  const { title, description, image_url, pubDate, source_name, link, category = [] } = article;

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));

    if (diffHours < 1) return "Baru saja";
    if (diffHours < 24) return `${diffHours} jam lalu`;
    if (diffHours < 48) return "Kemarin";
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  // Fallback image if none provided
  const imageUrl = image_url || `https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800`;

  // Animation delay for stagger effect
  const animationDelay = `${index * 0.1}s`;

  return (
    <div className="news-card" style={{ animationDelay }} onClick={() => link && link !== "#" && window.open(link, "_blank")}>
      <div className="news-card-image">
        <img src={imageUrl} alt={title} loading="lazy" />
        {category && category.length > 0 && <div className="news-card-badge">{category[0]}</div>}
      </div>

      <div className="news-card-content">
        <div className="news-card-meta">
          <span className="news-source">{source_name || "NewsTomotive"}</span>
          <span className="news-divider">•</span>
          <span className="news-time">{formatDate(pubDate)}</span>
        </div>

        <h3 className="news-title">{title}</h3>

        {description && <p className="news-description">{description.length > 150 ? `${description.substring(0, 150)}...` : description}</p>}

        <button className="news-read-more">
          Baca Selengkapnya
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default NewsCard;
