const express = require('express');
const router = express.Router();
const Favorite = require('../models/favoriteModel');

// Route to get favorites by user ID
router.get('/favorites/byUserID/:userID', async (req, res) => {
  const userID = req.params.userID;

  try {
    // Query the database for favorites associated with the specified user ID
    const favorites = await Favorite.find({ userID: userID });

    if (favorites.length === 0) {
      // If no favorites found for the user, return a 404 status code
      return res.status(404).json({ message: 'No favorites found for the specified user ID' });
    }

    // If favorites found, return them in the response
    res.json(favorites);
  } catch (error) {
    // If an error occurs during database query or processing, return a 500 status code
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;