const Comment = require("../Models/Comment");
exports.getAllComments = async (id) => {
  try {
    return await Comment.find({ answer: id });
  } catch (error) {
    throw new Error("Failed to fetch comments.");
  }
};
exports.getCommentById = async (id) => {
  try {
    const comment = await Comment.findById(id);
    if (!comment) {
      throw new Error("Failed to get comment");
    }
    return comment;
  } catch (error) {
    throw new Error("Failed to fetch comment.");
  }
};
exports.createComment = async (id, FieldsValue, userId) => {
  try {
    FieldsValue.user = userId;
    FieldsValue.answer = id;
    const comment = new Comment(FieldsValue);
    return (await comment.save()).populate("user");
  } catch (error) {
    throw new Error("Failed to create comment.");
  }
};

exports.likeComment = async (id) => {
  try {
    const comment = await Comment.findById(id);
    comment.likecount += 1;
    return await comment.save();
  } catch (error) {
    throw new Error("Failed to like comment.");
  }
};
