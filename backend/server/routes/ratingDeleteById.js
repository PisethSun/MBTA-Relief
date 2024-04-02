const express = require("express");
const router = express.Router();
const  z = require('zod');
const ratingModel = require("../models/ratingModel");

router.delete('/delete/:ratingId', async (req, res) => {
    const id = req.params.ratingId
    try {
       const rating = await ratingModel.findByIdAndDelete(id);
       res.json({message: `This rating ID has been deleted ${id}`})
    } catch (error) {
        res.status(400).json({message: error.message})
    }

});

module.exports = router;