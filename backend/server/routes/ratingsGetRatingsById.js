const express = require("express");
const router = express.Router();
const newRatingModel = require("../models/ratingModel");

router.get("/get/:ratingId", async (req, res) => {
  const { ratingId } = req.params; // Use req.params to get the ratingId from the URL parameter

  try {
    // Use findById method of newRatingModel to find the rating by its ID
    const rating = await newRatingModel.findById(ratingId);

    // If no rating found with the given ID, return a 404 response
    if (!rating) {
      return res.status(404).send("Rating does not exist.");
    }

    // Return the rating in the response
    return res.json(rating);
  } catch (err) {
    // If an error occurs, log it and return a 500 response
    console.error('Error fetching rating:', err);
    return res.status(500).send("Failed to fetch rating.");
  }
});

module.exports = router;
