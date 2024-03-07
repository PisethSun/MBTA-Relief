const express = require("express");
const router = express.Router();
const favModel = require('../models/favoriteModel');

// Getting all favorite
router.get('/getAll', async (req, res) => {
    try {
        const favorites = await favModel.find();
        return res.json(favorites);
        // If fav not found 
    } catch (error) {
        console.error('Error fetching favorites:', error);
        return res.status(500).json({ error: 'Failed to fetch favorites' });
    }
});

module.exports = router;