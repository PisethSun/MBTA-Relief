const express = require("express");
const router = express.Router();
const { z } = require('zod');
const Favorite = require("../models/favoriteModel");

const createFavoriteSchema = z.object({ userID: z.string().nonempty(), line: z.string(), station: z.string() });

router.post("/", async (req, res) => {
  try {
    const { userID, line, station } = createFavoriteSchema.parse(req.body);
    const newFavorite = await Favorite.create({ userID, line, station });
    res.status(201).json({ message: 'Favorite added successfully', favorite: newFavorite });
  } catch (error) {
    console.error('Error adding favorite:', error);
    res.status(error instanceof z.ZodError ? 400 : 500).json({ error: error instanceof z.ZodError ? error.issues[0].message : 'Failed to add favorite' });
  }
});

module.exports = router;
