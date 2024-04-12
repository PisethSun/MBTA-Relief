const express = require("express");
const router = express.Router();
const favoriteModel = require('../models/favoriteModel');

router.delete('/deleteAll', async (req, res) => {
    try {
        await favoriteModel.deleteMany({});
        return res.status(200).json({ message: 'All comments deleted successfully' });
    } catch (error) {
        console.error('Error deleting Favorite:', error);
        return res.status(500).json({ error: 'Failed to delete favorites' });
    }
});

module.exports = router;