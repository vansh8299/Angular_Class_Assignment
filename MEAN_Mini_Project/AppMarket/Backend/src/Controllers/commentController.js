const commentService = require("../Services/CommentService");

exports.getComment = async (req, res) => {
  try {
    const comment = await commentService.getComment(req.params.id);

    res.json(comment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
  res.status(500).json({ message: "Failed to create Comment" });
};
exports.createComment = async (req, res) => {
  try {
    const comment = await commentService.createComment(
      req.params.id,
      req.body,
      req.user._id
    );
    if (!comment) {
      res.status(404).json({ message: "Comment not found " });
    }
    res.json(comment);
  } catch (error) {
    res.status(500).json({ message: "Failed to create Comment" });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const comment = await commentService.deleteComment(req.params.id);
    if (!comment) {
      res.status(404).json({ message: "Comment not found " });
    }
    res.json(comment);
  } catch (error) {
    res.status(500).json({ message: "Failed to create Comment" });
  }
};
