const express = require("express");
const router = express.Router();
const newRatingModel = require('../models/ratingModel')

router.put("/update/:ratingId", async (req, res) => { 
    const { ratingId } = req.params

    const updateRating = newRatingModel.findByIdAndUpdate(req.params.RatingId, req.body)
        .then(post => res.json({msg: 'Rating sucessfully updated'}))
        .catch(err =>res.status(400).json({ error: 'Unable to update the Database' }));
})
  
module.exports = router;