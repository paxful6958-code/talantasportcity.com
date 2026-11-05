const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();

// Enable CORS and body parsing
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
app.use(express.static(path.join(process.cwd(), "public")));

// Import PayHero route handlers safely
try {
    const payheroRoutes = require("./routes/payhero");
    app.use("/api/payhero", payheroRoutes);
} catch (err) {
    console.log("PayHero routes not loaded:", err.message);
}

// Explicit routes for standard HTML views
app.get("/", (req, res) => {
    res.sendFile(path.join(process.cwd(), "public", "index.html"));
});

app.get("/mpesa", (req, res) => {
    res.sendFile(path.join(process.cwd(), "public", "mpesa.html"));
});

app.get("/card", (req, res) => {
    res.sendFile(path.join(process.cwd(), "public", "card.html"));
});

// Fallback 404 handler for missing API endpoints
app.use("/api/*", (req, res) => {
    res.status(404).json({
        success: false,
        message: `API endpoint ${req.originalUrl} not found.`
    });
});

// Catch-all fallback for SPA client-side routing
app.get("*", (req, res) => {
    res.sendFile(path.join(process.cwd(), "public", "index.html"));
});

const PORT = process.env.PORT || 3000;

if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
}

// Export the Express app for Vercel serverless functions
module.exports = app;