const express = require("express");
const router = express.Router();
const commentController = require("../Controllers/commentController");
const {
  authenticateUser,
  authorizeUser,
  authorizeCreator,
} = require("../Middleware/authMiddleware");

router.get(
  "/:id",
  authenticateUser,

  commentController.getComment
);
router.post(
  "/:id",
  authenticateUser,

  commentController.createComment
);
router.delete("/:id", authenticateUser, commentController.deleteComment);

module.exports = router;
