const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();

// Enable CORS and body parsing
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (index.html, card.html, CSS, JS, images) from 'public' directory
app.use(express.static(path.join(__dirname, "public")));

// Import PayHero route handlers
const payheroRoutes = require("./routes/payhero");

// Mount PayHero routes under /api/payhero
// This ensures POST requests to /api/payhero/stk-push route correctly
app.use("/api/payhero", payheroRoutes);

// Explicit routes for standard HTML views
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/mpesa", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "mpesa.html"));
});

app.get("/card", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "card.html"));
});

// Fallback 404 handler for missing API endpoints (returns JSON instead of HTML)
app.use("/api/*", (req, res) => {
    res.status(404).json({
        success: false,
        message: `API endpoint ${req.originalUrl} not found.`
    });
});

// Catch-all fallback for SPA client-side routing
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

const PORT = process.env.PORT || 3000;

// Only call app.listen when running locally, not on Vercel serverless
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`🚀 Talanta Sports City Server running on http://localhost:${PORT}`);
    });
}

// Export the Express app for Vercel deployment
module.exports = app;