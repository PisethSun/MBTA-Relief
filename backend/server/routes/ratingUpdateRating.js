const express = require("express");
const router = express.Router();
const z = require('zod');
const ratingModel = require("../models/ratingModel");

router.put('/update/:ratingId', async (req, res) => {
    const id = req.params.ratingId
    try {
       const newRating = req.body
       const rating = await ratingModel.findByIdAndUpdate(id, newRating);
       res.json(rating)
    } catch (error) {
        res.status(400).json({message: error.message})
    }

});

module.exports = router;