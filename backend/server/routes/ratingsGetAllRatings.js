const express = require("express");
const router = express.Router();
const newRatingModel = require('../models/ratingModel')

router.get('/getAllRatings', async (req, res) => {
    const ratings = await newRatingModel.find();
    return res.json(ratings)
  })

  module.exports = router;