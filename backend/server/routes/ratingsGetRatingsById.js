const express = require("express");
const router = express.Router();
const z = require("zod");
const bcrypt = require("bcrypt");

const newRatingModel = require("../models/ratingModel");

router.get("/getRatingById", async (req, res) => {
  var { ratingId } = req.body;

  newUserModel.findById(ratingId, function (err, rating) {
    if (err) {
      console.log(err);
    }
    if (rating==null) {
      res.status(404).send("ratingId does not exist.");
    } 
    else {
      return res.json(rating);
    }
  });
});

module.exports = router;
