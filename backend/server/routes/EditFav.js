const express = require("express");
const router = express.Router();
const FavoriteModel = require('../models/favoriteModel');
const z = require('zod');

const editFavoriteSchema = z.object({
  _id: z.string(), 
  userID: z.string().optional(),
  bathroomId:z.string(),
  line: z.string(),
  station: z.string(),
});

router.post('/EditFav', async (req, res) => {
  try {

    const { error, data } = editFavoriteSchema.safeParse(req.body);
    if (error) {
      return res.status(400).json({ message: error.message });
    }

    const { _id, bathroomId, line, station } = data;
    const favorite = await FavoriteModel.findOneAndUpdate({ _id }, {bathroomId, line, station }, { new: true });
    if (!favorite) {
      return res.status(404).json({ message: 'Favorite not found' });
    }

    return res.json({ message: 'Favorite updated successfully', favorite });
  } catch (error) {
    console.error('Error editing favorite:', error);
    res.status(500).json({ message: 'Failed to edit favorite' });
  }
});

module.exports = router;