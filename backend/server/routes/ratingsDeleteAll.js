const express = require("express");
const router = express.Router();
const newRatingModel = require('../models/ratingModel')

router.post('/deleteAll', async (req, res) => {
    const rating = await newRatingModel.deleteMany();
    return res.json(rating)
  })

  module.exports = router;