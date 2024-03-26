const express = require("express");
const router = express.Router();
const z = require('zod');
const commentModel = require("../models/commentModel");

router.put('/editComment/:commentId', async (req, res) => {
    const id = req.params.commentId
    try {
        const newComment = req.body
       const comment = await commentModel.findByIdAndUpdate(id, newComment);
       res.json(comment)
    } catch (error) {
        res.status(400).json({message: error.message})
    }

});

module.exports = router;