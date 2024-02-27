const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  bathroomId: {
    type: String,
    required: true,
  },
  dateFavorited: {
    type: Date,
    default: () => Date.now(),
  }
}, { collection: "favorites" });

// Ensure that a user cannot favorite the same bathroom more than once
favoriteSchema.index({ userId: 1, bathroomId: 1 }, { unique: true });

module.exports = mongoose.model('favorites', favoriteSchema);