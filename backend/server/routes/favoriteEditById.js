const express = require("express");
const router = express.Router();
const  z = require('zod');
const favoriteModel = require("../models/favoriteModel");

router.put('/editFav/:favId', async (req, res) => {
    const id = req.params.favId
    try {
        const newFav = req.body
       const fav = await favoriteModel.findByIdAndUpdate(id, newFav);
       res.json(fav)
    } catch (error) {
        res.status(400).json({message: error.message})
    }

});

// For delete = no line 9 and remove NewFav , and change findIDdelete


module.exports = router;