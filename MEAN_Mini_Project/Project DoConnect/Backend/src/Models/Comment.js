const mongoose = require("mongoose");
const commentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  comment_statement: {
    type: String,
    required: true,
  },
  answer: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Answer",
  },
  likecount: {
    type: Number,
    default: 0,
  },
});
const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;
