require("dotenv").config();
const express = require("express");
const fetch = require("node-fetch");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;

const OMDB_API_KEY = process.env.OMDB_API_KEY;

// Serve static files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, ".")));

// API Proxy Route
// Enhanced API Proxy Route (for search by title OR ID)
app.get("/api/search", async (req, res) => {
  const { q, id } = req.query;
  let url = "";

  if (q) {
    url = `http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${q}`;
  } else if (id) {
    url = `http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${id}`;
  } else {
    return res.status(400).json({ error: "Missing query or id parameter" });
  }

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Error fetching from OMDB" });
  }
});


app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
