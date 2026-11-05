const express = require('express');
const cors = require('cors');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Your PayHero STK Push API Route
app.post('/api/payhero/stk-push', async (req, res) => {
  try {
    const paymentData = req.body;

    // TODO: Add your PayHero API integration logic here
    // Example: Make a fetch request to PayHero's live API using process.env.PAYHERO_API_KEY

    console.log("Received STK Push request:", paymentData);

    // Send a successful JSON response back to the client
    return res.status(200).json({
      success: true,
      message: "STK push request processed successfully",
      data: paymentData
    });

  } catch (error) {
    console.error("STK Push Route Error:", error);
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// IMPORTANT: Do NOT use app.listen() here! 
// Export the app so Vercel can handle it serverlessly.
module.exports = app;
