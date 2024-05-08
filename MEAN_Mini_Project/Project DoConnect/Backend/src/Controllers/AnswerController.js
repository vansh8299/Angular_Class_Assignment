const answerService = require("../Services/AnswerService");
exports.getAllAnswers = async (req, res) => {
  try {
    const answers = await answerService.getAllAnswers(req.params.id);
    if (!answers) {
      res.status(404).json({ message: "Failed to get answers" });
    }
    res.json(answers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.getAnswerById = async (req, res) => {
  try {
    const answer = await answerService.getAnswerById(req.params.id);
    if (!answer) {
      res.status(404).json({ message: "Failed to get answer" });
    }
    res.json(answer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.createAnswer = async (req, res) => {
  try {
    const answer = await answerService.createAnswer(
      req.params.id,
      req.body,
      req.user._id
    );
    if (!answer) {
      res.status(404).json({ message: "No answer Found" });
    }
    // await questionService.addAnswer(answer.question,answer._id)
    res.json(answer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.updateAnswer = async (req, res) => {
  try {
    const answer = await answerService.updateAnswer(req.params.id, req.body);
    if (!answer) {
      res.status(404).json({ message: "No answer Found" });
    }
    res.json(answer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.deleteAnswer = async (req, res) => {
  try {
    await answerService.deleteAnswer(req.params.id);
    res.json({ message: "Answer Deleted Successfully.." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.likeAnswer = async (req, res) => {
  try {
    const answer = await answerService.likeAnswer(req.params.id);
    if (!answer) {
      res.status(404).json({ message: "No answer Found" });
    }
    res.json("Thanku for your like..");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
