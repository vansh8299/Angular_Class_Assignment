const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  trail: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hike",
  },
  rating: {
    type: Number,
  },
  comment: {
    type: String,
  },
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
