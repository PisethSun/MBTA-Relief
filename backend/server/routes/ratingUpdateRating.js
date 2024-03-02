const express = require("express");
const router = express.Router();
const newPostModel = require('../models/ratingModel')

router.put("/rating/updateRating/:ratingId", async (req, res) => { 
    const { ratingId } = req.params

    const updatePost = newPostModel.findByIdAndUpdate(req.params.postId, req.body)
        .then(post => res.json({msg: 'Rating sucessfully updated'}))
        .catch(err =>res.status(400).json({ error: 'Unable to update the Database' }));
})
  
module.exports = router;