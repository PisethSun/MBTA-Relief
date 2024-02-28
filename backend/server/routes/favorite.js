const express = require("express");
const Favorite = require("../models/favoriteModel");

const favoriteRoutes = express.Router();

// Add a bathroom to user's favorites
favoriteRoutes.post("/favorites/add", async (req, res) => {
  const { userId, bathroomId } = req.body;

  if (!userId || !bathroomId) {
    return res.status(403).json("Please provide both userId and bathroomId.");
  }

  try {
    // Check if the bathroom is already favorited by this user
    const existingFavorite = await Favorite.findOne({ userId, bathroomId });
    if (existingFavorite) {
      return res.status(409).json("This bathroom is already in user's favorites.");
    }

    // Add the bathroom to favorites
    const newFavorite = await Favorite.create({ userId, bathroomId });
    return res.status(201).json(newFavorite);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
});

// Remove a bathroom from user's favorites
favoriteRoutes.delete("/favorites/remove/:userId/:bathroomId", async (req, res) => {
  const { userId, bathroomId } = req.params;

  try {
    const favoriteToDelete = await Favorite.findOneAndDelete({ userId, bathroomId });
    if (!favoriteToDelete) {
      return res.status(404).json("Favorite not found.");
    }

    return res.status(200).json({ msg: "Favorite removed successfully." });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
});

// List all favorites for a user
favoriteRoutes.get("/favorites/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const favorites = await Favorite.find({ userId });
    if (favorites.length === 0) {
      return res.status(404).json("No favorites found for this user.");
    }

    return res.status(200).json(favorites);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = favoriteRoutes;