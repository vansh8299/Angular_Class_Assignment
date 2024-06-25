const commentService = require("../Services/CommentService");

exports.getComment = async (req, res) => {
  try {
    const comment = await commentService.getComment(req.params.id);
    res.json(comment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createComment = async (req, res) => {
  try {
    const comment = await commentService.createComment(
      req.params.id,
      req.body,
      req.user._id
    );
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    res.json(comment);
  } catch (error) {
    console.error("Error in createComment controller:", error);
    res
      .status(500)
      .json({ message: "Failed to create Comment", error: error.message });
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
