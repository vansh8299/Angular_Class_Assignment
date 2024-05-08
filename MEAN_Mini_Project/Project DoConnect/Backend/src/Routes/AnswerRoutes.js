const express = require("express");
const router = express.Router();
const AnswerController = require("../Controllers/AnswerController");

router.get("/:id", AnswerController.getAllAnswers);
router.get("/:id/details", AnswerController.getAnswerById);
router.post("/:id", AnswerController.createAnswer);
router.put("/:id/like", AnswerController.likeAnswer);
router.put("/:id", AnswerController.updateAnswer);
router.delete("/:id", AnswerController.deleteAnswer);
module.exports = router;
