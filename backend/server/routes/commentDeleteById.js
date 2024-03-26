const express = require("express");
const router = express.Router();
const  z = require('zod');
const commentModel = require("../models/commentModel");

router.delete('/deleteById/:commentId', async (req, res) => {
    const id = req.params.favId
    try {
       const comment = await commentModel.findByIdAndDelete(id);
       res.json({message: `This comment ID has been deleted ${id}`})
    } catch (error) {
        res.status(400).json({message: error.message})
    }

});

module.exports = router;