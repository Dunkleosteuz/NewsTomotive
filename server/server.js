const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Serve static files from the client `public` (optional)
app.use(express.static(path.join(__dirname, "..", "public")));

// Minimal API: only return the local fallback cars JSON
app.get("/api/cars", (req, res) => {
  try {
    const localPath = path.join(__dirname, "..", "public", "data", "cars.json");
    if (fs.existsSync(localPath)) {
      const raw = fs.readFileSync(localPath, "utf8");
      // support both array or { data: [...] } formats
      const parsed = JSON.parse(raw);
      const data = Array.isArray(parsed) ? parsed : parsed.data || parsed;
      return res.json({ success: true, source: "local", count: Array.isArray(data) ? data.length : 0, data });
    }

    // If file missing, return empty dataset as fallback
    return res.json({ success: true, source: "fallback", count: 0, data: [] });
  } catch (err) {
    console.error("Error in /api/cars:", err.message);
    res.status(500).json({ success: false, error: err.message });
  }
});

// Keep root simple and informative
app.get("/", (req, res) => {
  res.send("Car API fallback server running. Use GET /api/cars to fetch local data.");
});

// Default 404 for anything else
app.use((req, res) => {
  res.status(404).json({ success: false, error: "Route not found", path: req.path, method: req.method });
});

app.listen(PORT, () => {
  console.log(`Car fallback API server running on http://localhost:${PORT}`);
});
