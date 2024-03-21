const express = require("express");
const router = express.Router();
const { z } = require('zod');

const Comment = require("../models/commentModel");

const createCommentSchema = z.object(
    {
  userId: z.string().nonempty(),
  line: z.string(),
  station: z.string()
});

router.post("/", async (req, res) => {
  try {
    const { userId, line, station } = createCommentSchema.parse(req.body);

    const newComment = new Comment({
      userId,
      line,
      station
    });

    await newComment.save();

    res.status(201).json({ message: 'Your Comment Added', comment: newComment });
  } catch (error) {
    console.error('Error adding comment:', error);

    if (error instanceof z.ZodError) {
      res.status(400).json({ error: error.issues[0].message }); 
    } else {
      res.status(500).json({ message: 'Failed to add comment' }); 
    }
  }
});

module.exports = router;