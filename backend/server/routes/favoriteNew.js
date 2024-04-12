const express = require("express");
const router = express.Router();
const { z } = require('zod');

const Favorite = require("../models/favoriteModel");

const createFavoriteSchema = z.object(
    {
  userId: z.string().nonempty(),
  line: z.string(),
  station: z.string()
});

router.post("/", async (req, res) => {
  try {
    const { userId, line, station } = createFavoriteSchema.parse(req.body);

    const existingFavorite = await Favorite.findOne({ userId, station });
    if (existingFavorite) {
      return res.status(400).json({ message: 'You have already favorited this station' });
    }

    const newFavorite = new Favorite({
      userId,
      line,
      station
    });

    await newFavorite.save();

    res.status(201).json({ message: 'Your favorite has been added', favorite: newFavorite });
  } catch (error) {
    console.error('Error adding favorite:', error);

    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: 'Station is already favorited' });
    } else {
      return res.status(500).json({ message: 'Failed to add favorite' });
    }
  }
});


module.exports = router;