import React, { useState, useEffect } from "react";
import { fetchGeneralNews } from "../services/newsApi";
import NewsHero from "../components/NewsHero";
import NewsCard from "../components/NewsCard";
import NewsletterForm from "../components/NewsletterForm";

const Home = () => {
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
      const data = await fetchGeneralNews();
      setNews(data);
      setFilteredNews(data);
    } catch (error) {
      console.error("Error loading news:", error);
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

  const featuredArticle = filteredNews.length > 0 ? filteredNews[0] : null;
  const otherNews = filteredNews.slice(1);

  return (
    <div className="page-home">
      <section className="hero-section">
        <div className="hero-content-wrapper">
          <div className="hero-text">
            <h1 className="hero-title">
              <span className="gradient-text">NewsTomotive</span>
            </h1>
            <p className="hero-subtitle">Portal Berita Otomotif Terkini Indonesia</p>
            <p className="hero-description">Dapatkan informasi terbaru seputar dunia otomotif, dari mobil hingga motor, teknologi terkini, hingga tips dan trik perawatan kendaraan.</p>
          </div>
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
              <input type="text" placeholder="Cari berita otomotif..." value={searchQuery} onChange={handleSearchChange} className="search-input" />
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
          <p>Memuat berita terbaru...</p>
        </div>
      ) : featuredArticle ? (
        <>
          <section className="featured-section">
            <div className="container">
              <NewsHero article={featuredArticle} />
            </div>
          </section>
          <section className="news-grid-section">
            <div className="container">
              <h2 className="section-title">
                <span className="title-icon">📰</span>
                Berita Terbaru
              </h2>
              {otherNews.length > 0 ? (
                <div className="news-grid">
                  {otherNews.map((article, index) => (
                    <NewsCard key={article.article_id || index} article={article} index={index} />
                  ))}
                </div>
              ) : (
                <div className="no-results">
                  <p>Tidak ada berita yang ditemukan.</p>
                </div>
              )}
            </div>
          </section>
          <section className="newsletter-section">
            <div className="container-small">
              <NewsletterForm />
            </div>
          </section>
        </>
      ) : (
        <div className="no-results">
          <p>Tidak ada berita yang tersedia saat ini.</p>
        </div>
      )}
    </div>
  );
};

export default Home;
