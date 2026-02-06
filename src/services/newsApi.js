/**
 * News API Service untuk NewsTomotive
 * Menggunakan newsdata.io API
 */

// Fallback data jika API tidak tersedia
const FALLBACK_NEWS = [
  {
    article_id: "fallback-1",
    title: "Tesla Model Y Terbaru Diluncurkan dengan Fitur Autopilot Canggih",
    description: "Tesla merilis Model Y terbaru dengan teknologi autopilot generasi terbaru dan peningkatan jangkauan baterai hingga 500km.",
    link: "#",
    image_url: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800",
    pubDate: new Date().toISOString(),
    source_id: "fallback",
    source_name: "NewsTomotive",
    category: ["automotive", "technology"],
    keywords: ["tesla", "mobil", "electric", "autopilot"],
  },
  {
    article_id: "fallback-2",
    title: "Honda Vario 160 Resmi Meluncur di Indonesia dengan Harga Terjangkau",
    description: "Honda meluncurkan Vario 160 dengan desain baru dan mesin lebih bertenaga, menargetkan segmen motor matic premium.",
    link: "#",
    image_url: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=800",
    pubDate: new Date(Date.now() - 3600000).toISOString(),
    source_id: "fallback",
    source_name: "NewsTomotive",
    category: ["automotive"],
    keywords: ["honda", "motor", "vario", "matic"],
  },
  {
    article_id: "fallback-3",
    title: "Toyota Avanza Veloz Hybrid Raih Penghargaan Mobil Terlaris 2026",
    description: "Toyota Avanza Veloz versi hybrid menjadi mobil terlaris tahun ini dengan penjualan mencapai 50 ribu unit dalam 6 bulan.",
    link: "#",
    image_url: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800",
    pubDate: new Date(Date.now() - 7200000).toISOString(),
    source_id: "fallback",
    source_name: "NewsTomotive",
    category: ["automotive", "business"],
    keywords: ["toyota", "mobil", "avanza", "hybrid"],
  },
  {
    article_id: "fallback-4",
    title: "Yamaha NMAX Turbo Siap Dirilis dengan Performa Maksimal",
    description: "Yamaha akan meluncurkan NMAX Turbo dengan mesin turbocharger pertama di kelasnya, siap bersaing di pasar motor sport.",
    link: "#",
    image_url: "https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=800",
    pubDate: new Date(Date.now() - 10800000).toISOString(),
    source_id: "fallback",
    source_name: "NewsTomotive",
    category: ["automotive"],
    keywords: ["yamaha", "motor", "nmax", "turbo"],
  },
  {
    article_id: "fallback-5",
    title: "BMW Seri 5 Electric Hadir di Indonesia dengan Teknologi Terdepan",
    description: "BMW memperkenalkan Seri 5 versi electric di Indonesia dengan fitur AI assistant dan charging super cepat.",
    link: "#",
    image_url: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800",
    pubDate: new Date(Date.now() - 14400000).toISOString(),
    source_id: "fallback",
    source_name: "NewsTomotive",
    category: ["automotive", "technology"],
    keywords: ["bmw", "mobil", "electric", "luxury"],
  },
  {
    article_id: "fallback-6",
    title: "Suzuki GSX-R1000 Edisi Spesial MotoGP Dijual Terbatas",
    description: "Suzuki merilis GSX-R1000 edisi MotoGP dengan livery khusus dan performa mesin yang ditingkatkan, hanya 100 unit.",
    link: "#",
    image_url: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800",
    pubDate: new Date(Date.now() - 18000000).toISOString(),
    source_id: "fallback",
    source_name: "NewsTomotive",
    category: ["automotive", "sports"],
    keywords: ["suzuki", "motor", "motogp", "sport"],
  },
];

/**
 * Fetch news dari newsdata.io API
 * @param {string} apiKey - API key dari newsdata.io
 * @param {string} category - Category filter: 'all', 'car', 'motorcycle'
 * @param {string} query - Search query
 * @returns {Promise<Array>} - Array of news articles
 */
export const fetchNews = async (apiKey = null, category = "all", query = "") => {
  try {
    // Coba ambil API key dari localStorage jika tidak diberikan
    const resolvedKey = apiKey || (typeof window !== "undefined" ? localStorage.getItem("NEWS_API_KEY") : null);

    // Jika tidak ada API key sama sekali, gunakan fallback
    if (!resolvedKey) {
      console.warn("⚠️ No API key provided, using fallback news data");
      return filterNewsByCategory(FALLBACK_NEWS, category, query);
    }

    // Build query parameters
    const params = new URLSearchParams();
    params.append("apikey", resolvedKey);
    params.append("language", "id,en");

    // Tentukan query berdasarkan kategori
    let searchQuery = query || "otomotif";
    if (category === "car") {
      searchQuery = query || "mobil OR car OR automotive";
    } else if (category === "motorcycle") {
      searchQuery = query || "motor OR motorcycle OR bike";
    }

    params.append("q", searchQuery);
    params.append("country", "id");

    // Gunakan endpoint "latest" agar sesuai dengan kebutuhan user
    const url = `https://newsdata.io/api/1/latest?${params.toString()}`;

    console.log(`📰 Fetching news from newsdata.io (category: ${category})`);

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      console.warn(`⚠️ API returned ${response.status}, using fallback data`);
      return filterNewsByCategory(FALLBACK_NEWS, category, query);
    }

    const data = await response.json();

    if (data.status === "success" && data.results && data.results.length > 0) {
      console.log(`✅ Retrieved ${data.results.length} news articles`);
      return data.results;
    } else {
      console.warn("⚠️ No results from API, using fallback data");
      return filterNewsByCategory(FALLBACK_NEWS, category, query);
    }
  } catch (error) {
    console.error("❌ Error fetching news:", error.message);
    return filterNewsByCategory(FALLBACK_NEWS, category, query);
  }
};

/**
 * Filter fallback news berdasarkan kategori dan query
 */
const filterNewsByCategory = (news, category, query) => {
  let filtered = [...news];

  // Filter by category
  if (category === "car") {
    filtered = filtered.filter((article) => article.keywords.some((k) => ["mobil", "car", "toyota", "honda", "bmw", "tesla", "avanza"].includes(k.toLowerCase())));
  } else if (category === "motorcycle") {
    filtered = filtered.filter((article) => article.keywords.some((k) => ["motor", "motorcycle", "bike", "yamaha", "vario", "nmax", "suzuki"].includes(k.toLowerCase())));
  }

  // Filter by search query
  if (query && query.trim()) {
    const searchLower = query.toLowerCase();
    filtered = filtered.filter((article) => article.title.toLowerCase().includes(searchLower) || article.description.toLowerCase().includes(searchLower) || article.keywords.some((k) => k.toLowerCase().includes(searchLower)));
  }

  return filtered;
};

/**
 * Submit newsletter subscription
 * @param {Object} data - { email, name }
 * @returns {Promise<Object>}
 */
export const submitNewsletter = async (data) => {
  try {
    // Simulasi submit ke backend (bisa diganti dengan real endpoint)
    console.log("📧 Submitting newsletter subscription:", data);

    // Simpan ke localStorage sebagai fallback
    const subscriptions = JSON.parse(localStorage.getItem("newsletter_subscriptions") || "[]");
    subscriptions.push({
      ...data,
      subscribedAt: new Date().toISOString(),
    });
    localStorage.setItem("newsletter_subscriptions", JSON.stringify(subscriptions));

    return {
      success: true,
      message: "Terima kasih telah berlangganan newsletter NewsTomotive!",
    };
  } catch (error) {
    console.error("❌ Error submitting newsletter:", error);
    return {
      success: false,
      message: "Gagal mendaftar. Silakan coba lagi.",
    };
  }
};

/**
 * Get trending keywords from news
 */
export const getTrendingKeywords = (newsArticles) => {
  const keywordCount = {};

  newsArticles.forEach((article) => {
    if (article.keywords) {
      article.keywords.forEach((keyword) => {
        const key = keyword.toLowerCase();
        keywordCount[key] = (keywordCount[key] || 0) + 1;
      });
    }
  });

  // Sort dan ambil top 10
  return Object.entries(keywordCount)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10)
    .map(([keyword]) => keyword);
};

export default {
  fetchNews,
  submitNewsletter,
  getTrendingKeywords,
  FALLBACK_NEWS,
};

/**
 * Endpoint khusus sesuai permintaan user
 * - General otomotif: gabungkan hasil dari q=otomotif dan q=kendaraan
 * - Mobil: q=mobil
 * - Motor: q=motor
 */

const PUBLIC_KEY = "pub_6fc7fdff0a3b494f809b978cb6c34ec4";

const baseLatestUrl = (query) => `https://newsdata.io/api/1/latest?apikey=${PUBLIC_KEY}&q=${encodeURIComponent(query)}&category=technology&country=id`;

const normalizeResults = (results = []) => {
  // Pastikan struktur minimal yang dibutuhkan komponen terpenuhi
  return (results || []).map((r, i) => ({
    article_id: r.article_id || r.link || `id-${i}`,
    title: r.title || r.description || "Berita Otomotif",
    description: r.description || "",
    link: r.link || "#",
    image_url: r.image_url || r.image || null,
    pubDate: r.pubDate || r.pub_date || new Date().toISOString(),
    source_id: r.source_id || r.source || "newsdata",
    source_name: r.source_name || r.source || "NewsData",
    category: r.category || ["automotive"],
    keywords: r.keywords || [],
  }));
};

const uniqById = (items) => {
  const map = new Map();
  items.forEach((item) => {
    const id = item.article_id || item.link;
    if (!map.has(id)) map.set(id, item);
  });
  return Array.from(map.values());
};

export const fetchGeneralNews = async () => {
  try {
    const res1 = await fetch(baseLatestUrl("otomotif"));
    const res2 = await fetch(baseLatestUrl("kendaraan"));
    const d1 = (await res1.json()) || {};
    const d2 = (await res2.json()) || {};
    const items = uniqById([...normalizeResults(d1.results || []), ...normalizeResults(d2.results || [])]);
    return items.length ? items : FALLBACK_NEWS;
  } catch (e) {
    console.warn("⚠️ fetchGeneralNews fallback:", e?.message);
    return FALLBACK_NEWS;
  }
};

export const fetchCarNews = async () => {
  try {
    const res = await fetch(baseLatestUrl("mobil"));
    const data = (await res.json()) || {};
    const items = normalizeResults(data.results || []);
    return items.length ? items : filterNewsByCategory(FALLBACK_NEWS, "car", "");
  } catch (e) {
    console.warn("⚠️ fetchCarNews fallback:", e?.message);
    return filterNewsByCategory(FALLBACK_NEWS, "car", "");
  }
};

export const fetchMotorNews = async () => {
  try {
    const res = await fetch(baseLatestUrl("motor"));
    const data = (await res.json()) || {};
    const items = normalizeResults(data.results || []);
    return items.length ? items : filterNewsByCategory(FALLBACK_NEWS, "motorcycle", "");
  } catch (e) {
    console.warn("⚠️ fetchMotorNews fallback:", e?.message);
    return filterNewsByCategory(FALLBACK_NEWS, "motorcycle", "");
  }
};

export { PUBLIC_KEY };
