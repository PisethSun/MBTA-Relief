const express = require("express");
const router = express.Router();
const commentModel = require('../models/commentModel');

router.post('/createComment', async (req, res) => {
    try {
        // Using the correct model variable name to create a new comment instance
        const newComment = new commentModel(req.body);
        await newComment.save(); // Saving the new comment
        res.status(201).json(newComment); // Responding with the created comment
    } catch (error) {
        console.error('Error creating comment:', error); // Enhanced error logging
        res.status(400).json({ message: 'Failed to create comment', error: error.message }); // More informative error response
    }
});

module.exports = router;