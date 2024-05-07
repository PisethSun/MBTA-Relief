const express = require("express");
const router = express.Router();
const Rating = require("../models/ratingModel"); 

// Route to search ratings by station
router.get("/:station", async (req, res) => {
  const stationName = req.params.station;

  try {
    
    const ratings = await Rating.find({ station: stationName });

    res.json({ ratings });
  } catch (error) {
    console.error("Error searching ratings:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
