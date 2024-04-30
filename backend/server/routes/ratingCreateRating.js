const express = require("express");
const router = express.Router();
const newPostModel = require('../models/ratingModel');
const mongoose = require("mongoose");

router.post("/createrating", async (req, res) => {
  const {  rating,station,comment } = req.body;

  const createNewRating = newPostModel({
    rating: rating,
    station: station, 
    comment: comment
  });

  try {
    const response = await newPostModel.create(createNewRating);
    res.json({ msg: 'Rating created successfully' });
  } catch (err) {
    console.error('Error creating rating:', err);
    res.status(500).json({ error: 'Could not create rating' });
  }
});

module.exports = router;