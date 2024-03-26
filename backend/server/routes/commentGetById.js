const express = require("express");
const router = express.Router();
const newCommentModel = require("../models/commentModel");

router.get("/get/:commentId", async (req, res) => {
  const { commentId } = req.params;
  try {
    const comment = await newCommentModel.findById(commentId);
    if (!comment) {
      return res.status(404).send("Comment does not exist.");
    }
    return res.json(comment);
  } catch (err) {
    console.error('Error fetching comment:', err);
    return res.status(500).send("Failed to fetch comment.");
  }
});

module.exports = router;