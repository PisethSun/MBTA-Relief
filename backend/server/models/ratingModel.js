const mongoose = require("mongoose");
const { Schema, ObjectId } = mongoose;

const ratingSchema = new Schema(
  {
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
    comment:{
      type: String,
      required: false,
      label: "comment"
    }
  },
  { collection: "ratings" }
);

module.exports = mongoose.model('ratings', ratingSchema);
