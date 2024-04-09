const mongoose = require("mongoose");

const commentsSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
   },
    comment: {
      type: String,
      required: false,
  },
    station: {
      type: String,
      required: false,
  },
    date: {
      type: Date,
      default: Date.now,
      required: false,
    }
  }, 
  { collection: "comments" }
);

module.exports = mongoose.model('comments', commentsSchema);