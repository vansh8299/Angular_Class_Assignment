const commentService = require("../Services/CommentService");

exports.getAllComments = async (req, res) => {
  try {
    const comments = await commentService.getAllComments(req.params.id);
    if (!comments) {
      res.status(404).json({ message: "Failed to get comments" });
    }
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.getCommentById = async (req, res) => {
  try {
    const comment = await commentService.getCommentById(req.params.id);
    if (!comment) {
      res.status(404).json({ message: "Failed to get comment" });
    }
    res.json(comment);
  } catch (error) {
    res.status(500).json({ message: error.message });
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
      res.status(404).json({ message: "No comment Found" });
    }
    // await questionService.addAnswer(answer.question,answer._id)
    res.json(comment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.likeComment = async (req, res) => {
  try {
    const comment = await commentService.likeComment(req.params.id);
    if (!comment) {
      res.status(404).json({ message: "No comment Found" });
    }
    res.json("Thanku for your like..");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
