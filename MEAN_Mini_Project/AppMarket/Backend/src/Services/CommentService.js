const Comment = require("../Model/Comment");

exports.getComment = async (id) => {
  try {
    return await Comment.find({ application: id });
  } catch (error) {
    throw new Error(error.message);
  }
};
exports.createComment = async (id, newFields, userId) => {
  newFields.user = userId;
  newFields.application = id;
  const newComment = new Comment(newFields);
  return await newComment.save();
};

exports.deleteComment = async (commentId) => {
  try {
    const comment = await Comment.findById(commentId);

    if (!comment) {
      return null;
    }

    await comment.deleteOne();
    return comment;
  } catch (error) {
    throw new Error(`Failed to delete comment: ${error.message}`);
  }
};
