import React from "react";

/**
 * NewsHero Component - Featured news hero section
 */
const NewsHero = ({ article }) => {
  if (!article) return null;

  const { title, description, image_url, pubDate, source_name, link } = article;

  const imageUrl = image_url || "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1200";

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="news-hero">
      <div className="news-hero-image">
        <img src={imageUrl} alt={title} />
        <div className="news-hero-overlay"></div>
      </div>

      <div className="news-hero-content">
        <div className="news-hero-badge">Breaking News</div>
        <h1 className="news-hero-title">{title}</h1>

        {description && <p className="news-hero-description">{description.length > 200 ? `${description.substring(0, 200)}...` : description}</p>}

        <div className="news-hero-meta">
          <span className="news-hero-source">{source_name || "NewsTomotive"}</span>
          <span className="news-divider">•</span>
          <span className="news-hero-time">{formatDate(pubDate)}</span>
        </div>

        {link && link !== "#" && (
          <button className="news-hero-button" onClick={() => window.open(link, "_blank")}>
            Baca Artikel Lengkap
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default NewsHero;
