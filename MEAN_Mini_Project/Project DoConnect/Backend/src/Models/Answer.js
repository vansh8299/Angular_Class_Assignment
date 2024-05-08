const mongoose = require("mongoose");
const answerSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    answer_statement: {
      type: String,
      required: true,
    },
    approved: {
      type: Boolean,
      default: false,
    },
    question: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Question",
    },
    likecount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
answerSchema.virtual("comments", {
  ref: "Comment",
  localField: "_id",
  foreignField: "answer",
});
const Answer = mongoose.model("Answer", answerSchema);
module.exports = Answer;
