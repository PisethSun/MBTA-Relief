const express = require("express");
const router = express.Router();
const Rating = require("./ratingModel");

// Route to get all ratings
router.get("/ratings", async (req, res) => {
  try {
    const ratings = await Rating.find();
    res.json(ratings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route to create a new rating
router.post("/ratings", async (req, res) => {
  const rating = new Rating({
    username: req.body.username,
    rating: req.body.rating,
    station: req.body.station
  });

  try {
    const newRating = await rating.save();
    res.status(201).json(newRating);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Route to get a specific rating by ID
router.get("/ratings/:id", async (req, res) => {
  try {
    const rating = await Rating.findById(req.params.id);
    if (!rating) {
      return res.status(404).json({ message: "Rating not found" });
    }
    res.json(rating);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route to update a rating by ID
router.patch("/ratings/:id", async (req, res) => {
  try {
    const rating = await Rating.findById(req.params.id);
    if (!rating) {
      return res.status(404).json({ message: "Rating not found" });
    }
    if (req.body.username) {
      rating.username = req.body.username;
    }
    if (req.body.rating) {
      rating.rating = req.body.rating;
    }
    if (req.body.station) {
      rating.station = req.body.station;
    }
    const updatedRating = await rating.save();
    res.json(updatedRating);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Route to delete a rating by ID
router.delete("/ratings/:id", async (req, res) => {
  try {
    const rating = await Rating.findById(req.params.id);
    if (!rating) {
      return res.status(404).json({ message: "Rating not found" });
    }
    await rating.remove();
    res.json({ message: "Rating deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
