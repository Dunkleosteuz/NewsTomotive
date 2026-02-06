import React, { useState } from "react";
import { submitNewsletter } from "../services/newsApi";

/**
 * NewsletterForm Component - Newsletter subscription dengan event handling
 */
const NewsletterForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    category: "all", // radio button: all, car, motorcycle
  });

  const [status, setStatus] = useState({ type: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Event handler untuk input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear status saat user mulai mengetik
    if (status.message) {
      setStatus({ type: "", message: "" });
    }
  };

  // Event handler untuk radio button
  const handleCategoryChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      category: e.target.value,
    }));
  };

  // Event handler untuk form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validasi
    if (!formData.email || !formData.name) {
      setStatus({
        type: "error",
        message: "Mohon lengkapi semua field!",
      });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setStatus({
        type: "error",
        message: "Format email tidak valid!",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await submitNewsletter(formData);

      if (result.success) {
        setStatus({
          type: "success",
          message: result.message,
        });
        // Reset form
        setFormData({
          email: "",
          name: "",
          category: "all",
        });
      } else {
        setStatus({
          type: "error",
          message: result.message,
        });
      }
    } catch (error) {
      setStatus({
        type: "error",
        message: "Terjadi kesalahan. Silakan coba lagi.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="newsletter-form">
      <div className="newsletter-header">
        <h2>📬 Berlangganan Newsletter</h2>
        <p>Dapatkan berita otomotif terkini langsung di inbox Anda!</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Nama Lengkap</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} placeholder="Masukkan nama Anda" className="form-input" disabled={isSubmitting} />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="nama@email.com" className="form-input" disabled={isSubmitting} />
        </div>

        <div className="form-group">
          <label>Kategori Berita yang Diminati</label>
          <div className="radio-group">
            <label className="radio-label">
              <input type="radio" name="category" value="all" checked={formData.category === "all"} onChange={handleCategoryChange} disabled={isSubmitting} />
              <span>Semua Berita Otomotif</span>
            </label>

            <label className="radio-label">
              <input type="radio" name="category" value="car" checked={formData.category === "car"} onChange={handleCategoryChange} disabled={isSubmitting} />
              <span>Berita Mobil</span>
            </label>

            <label className="radio-label">
              <input type="radio" name="category" value="motorcycle" checked={formData.category === "motorcycle"} onChange={handleCategoryChange} disabled={isSubmitting} />
              <span>Berita Motor</span>
            </label>
          </div>
        </div>

        {status.message && (
          <div className={`form-status ${status.type}`}>
            {status.type === "success" ? "✅" : "⚠️"} {status.message}
          </div>
        )}

        <button type="submit" className="form-submit" disabled={isSubmitting}>
          {isSubmitting ? "Mengirim..." : "Berlangganan Sekarang"}
        </button>
      </form>
    </div>
  );
};

export default NewsletterForm;
