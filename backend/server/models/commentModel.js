const mongoose = require("mongoose");

const commentsSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      label: "username",
   },
    comment: {
      type: String,
      required: false,
      label: "comment",
  },
    station: {
      type: String,
      required: false,
      label: "station"
  },
    commentId: {
      type: String,
      required: false,
    }
  }, 
  { collection: "comments" }
);

module.exports = mongoose.model('comments', commentsSchema);