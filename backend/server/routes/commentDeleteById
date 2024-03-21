const express = require("express");
const router = express.Router();
const commentModel = require('../models/commentModel');

router.delete('/deleteById/:id', async (req, res) => {
    try {
        const commentId = req.params.id;
        const deletedComment = await commentModel.findByIdAndDelete(commentId);

        if (!deletedComment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        res.status(200).json({ message: 'Comment deleted successfully', deletedCommentId: commentId });
    } catch (error) {
        console.error('Error deleting comment by ID:', error);
        res.status(500).json({ error: 'Failed to delete comment' });
    }
});

module.exports = router;