const express = require("express");
const router = express.Router();
const favoriteModel = require("../models/favoriteModel");

router.delete('/deleteAll', async (req, res) => {

    try {
       const deleteAll= await favoriteModel.find();
       const deleted = favoriteModel.deleteMany(deleteAll)
       console.log(deleted);
       res.json({message: `All Fav has been deleted`})
    } catch (error) {

        res.status(400).json({message: error.message})
    }

});

module.exports = router;