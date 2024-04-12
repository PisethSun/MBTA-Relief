const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
 
  line: {
    type: String,
    required: false,
  },
  station: {
    type: String,
    required: false,
  }
}, { collection: "favorites" });

module.exports = mongoose.model('favorites', favoriteSchema);
