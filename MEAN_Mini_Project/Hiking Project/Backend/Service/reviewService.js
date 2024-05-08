const Review = require("../Model/review");

exports.createreview = async (newFields) => {
  const newreview = new Review(newFields);
  return await newreview.save();
};

exports.updatereview = async (id, reviewId, rating, comment) => {
  try {
    const existingReview = await Review.findOne({
      _id: reviewId,
      trail: id,
    });
    if (!existingReview) {
      throw new Error("Review not found");
    }

    existingReview.rating = rating || existingReview.rating;
    existingReview.comment = comment || existingReview.comment;

    const updatedReview = await existingReview.save();

    return updatedReview;
  } catch (error) {
    throw error;
  }
};

exports.deletereview = async (id, reviewId) => {
  try {
    const deletedReview = await Review.findOneAndDelete({
      _id: reviewId,
      trail: id,
    });
    if (!deletedReview) {
      throw new Error("Review not found");
    }
    return deletedReview;
  } catch (error) {
    throw error;
  }
};
