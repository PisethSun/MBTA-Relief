const express = require("express");
const router = express.Router();
const z = require("zod");
const bcrypt = require("bcrypt");

const findFavbyID = require("../models/byfavbID");

router.get("/getUserById", async (req, res) => {
  var { userId } = req.body;

  findFavbyID.findById(userId, function (err, user) {
    if (err) {
      console.log(err);
    }
    if (user==null) {
      res.status(404).send("userId does not exist.");
    } 
    else {
      return res.json(user);
    }
  });
});

module.exports = router;
