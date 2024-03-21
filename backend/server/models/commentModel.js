const mongoose = require("mongoose");

const commentsSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      label: "username",
   },
    comment: {
      type: String,
      required: true,
      label: "comment",
  },
    station: {
      type: String,
      required: true,
      label: "station"
  },
    commentId: {
      type: String,
      required: true
    }
  }, 
  { collection: "comments" }
);

module.exports = mongoose.model('comments', commentsSchema);