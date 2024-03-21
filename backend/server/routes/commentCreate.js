const express = require("express");
const router = express.Router();
const newPostModel = require('../models/commentModel');
const mongoose = require("mongoose");

router.post("/createComment", async (req, res) => {
  const { commentId, username, comment, station  } = req.body;

  const createNewComment = newPostModel({
    commentId: commentId,
    username: username,
    comment: comment,
    station: station, 
  });

  try {
    const response = await newPostModel.create(createNewComment);
    res.json({ msg: 'Comment created successfully' });
  } catch (err) {
    console.error('Error creating comment:', err);
    res.status(500).json({ error: 'Could not create comment' });
  }
});

module.exports = router;