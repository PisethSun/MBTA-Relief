const express = require("express");
const router = express.Router();
const commentModel = require('../models/commentModel');

router.get('/getAll', async (req, res) => {
    try {
        const comments = await commentModel.find();
        return res.json(comments);
    } catch (error) {
        console.error('Error fetching comments:', error);
        return res.status(500).json({ error: 'Failed to fetch comments' });
    }
});

module.exports = router;