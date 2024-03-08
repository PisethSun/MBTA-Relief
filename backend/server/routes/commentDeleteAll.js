const express = require("express");
const router = express.Router();
const commentModel = require('../models/commentModel');

router.delete('/deleteAll', async (req, res) => {
    try {
        await commentModel.deleteMany({});
        return res.status(200).json({ message: 'All comments deleted successfully' });
    } catch (error) {
        console.error('Error deleting comments:', error);
        return res.status(500).json({ error: 'Failed to delete comments' });
    }
});

module.exports = router;