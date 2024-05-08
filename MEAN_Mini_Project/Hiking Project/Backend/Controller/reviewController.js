const reviewService = require("../Service/reviewService");

exports.createreview = async (req, res) => {
  try {
    const review = await reviewService.createreview(req.body);
    if (!review) {
      res.status(404).json({ message: "review not found " });
    }
    res.json(review);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updatereview = async (req, res) => {
  const { id, reviewId } = req.params;
  const { rating, comment } = req.body;
  try {
    const trail = await reviewService.updatereview(
      id,
      reviewId,
      rating,
      comment
    );
    if (!trail) {
      res.status(404).json({ message: "trail not found " });
    }
    res.json(trail);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deletereview = async (req, res) => {
  const { id, reviewId } = req.params;
  try {
    await reviewService.deletereview(id, reviewId);
    res.json({ message: "Trail deleted Successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
