const express = require("express");
const router = express.Router();
const Comment = require("../models/commentModel"); 

router.get("/:station", async (req, res) => {
  const stationName = req.params.station;

  try {
  
    const comments = await Comment.find({ station: stationName });

    res.json({ comments });
  } catch (error) {
    console.error("Error searching comments:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
