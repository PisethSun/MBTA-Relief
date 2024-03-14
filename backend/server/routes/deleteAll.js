const express = require("express");
const router = express.Router();
const  z = require('zod');
const favoriteModel = require("../models/favoriteModel");

router.delete('/deleteFav/:favId', async (req, res) => {
    const id = req.params.favId
    try {
       const fav = await favoriteModel.findByIdAndDelete(id);
       res.json({message: `This Fav ID has been deleted ${id}`})
    } catch (error) {
        res.status(400).json({message: error.message})
    }

});

module.exports = router;