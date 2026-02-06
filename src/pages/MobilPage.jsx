import React, { useState, useEffect } from "react";
import { fetchCarNews } from "../services/newsApi";
import NewsCard from "../components/NewsCard";

const MobilPage = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredNews, setFilteredNews] = useState([]);

  useEffect(() => {
    loadNews();
  }, []);

  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = news.filter((article) => article.title.toLowerCase().includes(searchQuery.toLowerCase()) || (article.description && article.description.toLowerCase().includes(searchQuery.toLowerCase())));
      setFilteredNews(filtered);
    } else {
      setFilteredNews(news);
    }
  }, [searchQuery, news]);

  const loadNews = async () => {
    setLoading(true);
    try {
      const data = await fetchCarNews();
      setNews(data);
      setFilteredNews(data);
    } catch (error) {
      console.error("Error loading car news:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleRefresh = () => {
    loadNews();
  };

  return (
    <div className="page-news">
      <section className="page-header">
        <div className="container">
          <h1 className="page-title">
            <span className="page-icon">🚗</span>
            Berita Mobil
          </h1>
          <p className="page-subtitle">Update terkini seputar dunia mobil, teknologi, dan industri otomotif</p>
        </div>
      </section>

      <section className="search-section">
        <div className="container">
          <div className="search-wrapper">
            <div className="search-box">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" />
                <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <input type="text" placeholder="Cari berita mobil..." value={searchQuery} onChange={handleSearchChange} className="search-input" />
            </div>
            <button onClick={handleRefresh} className="btn-refresh" title="Refresh berita">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M21 12a9 9 0 11-9-9c2.52 0 4.93 1 6.74 2.74L21 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M21 3v5h-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
          {searchQuery && (
            <p className="search-results">
              Menampilkan {filteredNews.length} hasil untuk "{searchQuery}"
            </p>
          )}
        </div>
      </section>

      {loading ? (
        <div className="loading-section">
          <div className="spinner"></div>
          <p>Memuat berita mobil...</p>
        </div>
      ) : (
        <section className="news-grid-section">
          <div className="container">
            {filteredNews.length > 0 ? (
              <div className="news-grid">
                {filteredNews.map((article, index) => (
                  <NewsCard key={article.article_id || index} article={article} index={index} />
                ))}
              </div>
            ) : (
              <div className="no-results">
                <p>Tidak ada berita mobil yang ditemukan.</p>
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  );
};

export default MobilPage;
