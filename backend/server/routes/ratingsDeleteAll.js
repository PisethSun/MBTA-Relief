const express = require("express");
const router = express.Router();
const ratingModel = require("../models/ratingModel");

router.delete('/deleteAll', async (req, res) => {

    try {
       const deleteAll= await ratingModel.find();
       const deleted = ratingModel.deleteMany(deleteAll)
       console.log(deleted);
       res.json({message: `All ratings has been deleted`})
    } catch (error) {

        res.status(400).json({message: error.message})
    }

});

module.exports = router;