const express = require("express");
const router = express.Router();
const newRatingModel = require('../models/ratingModel');

router.put("/update/:ratingId", async (req, res) => { 
    const { ratingId } = req.params;

    try {
        const updatedRating = await newRatingModel.findByIdAndUpdate(ratingId, req.body, { new: true });

        if (!updatedRating) {
            return res.status(404).json({ error: 'Rating not found' });
        }

        res.json({ msg: 'Rating successfully updated', rating: updatedRating });
    } catch (err) {
        console.error('Error updating rating:', err);
        res.status(500).json({ error: 'Failed to update rating' });
    }
});

module.exports = router;
