const mongoose = require("mongoose");

//rating schema/model
const ratingSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      label: "username",
    },
    rating: {
      type: int,
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