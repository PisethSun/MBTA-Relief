const express = require("express");
const router = express.Router();
const ratingModel = require("../models/ratingModel");

router.delete('/deleteAll', async (req, res) => {
    try {
       const deleteAll = await ratingModel.deleteMany({});
       console.log(deleteAll);
       res.json({message: `All ratings have been deleted`});
    } catch (error) {
        res.status(400).json({message: error.message});
    }
});

module.exports = router;
