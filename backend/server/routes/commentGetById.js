const express = require("express");
const router = express.Router();
const z = require("zod");
const bcrypt = require("bcrypt");

const newCommentModel = require("../models/commentModel");

router.get("/getCommentById", async (req, res) => {
  var { commentId } = req.body;

  newUserModel.findById(commentId, function (err, comment) {
    if (err) {
      console.log(err);
    }
    if (comment==null) {
      res.status(404).send("comment does not exist.");
    } 
    else {
      return res.json(comment);
    }
  });
});

module.exports = router;