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
    commentId: {
      type: String,
      required: false,
    }
  }, 
  { collection: "comments" }
);

module.exports = mongoose.model('comments', commentsSchema);