const express = require("express");
const router = express.Router();
const favoriteModel = require('../models/favoriteModel');

router.delete('/deleteAll', async (req, res) => {
    try {
        await favoriteModel.deleteMany();
      
    } catch (error) {
        console.error('Error deleting Fav:', error);
        // return res.status(500).json({ error: 'Failed to delete Favorite'});
    }

});

module.exports = router;