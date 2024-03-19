const mongoose = require("mongoose");


const ratingSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      label: "username",
    },
    rating: {
      type: Number,
      required: true,
      label: "rating",
    },
    station: {
      type: String,
      required: true,
      label: "station"
    },
    ratingId: {
      type: String,
      required: true,
   }
  },
  { collection: "ratings" }
);

module.exports = mongoose.model('ratings', ratingSchema)