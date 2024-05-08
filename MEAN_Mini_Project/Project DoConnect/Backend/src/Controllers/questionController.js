const questionService = require("../Services/QuestionService");
exports.getAllQuestions = async (req, res) => {
  try {
    const questions = await questionService.getAllQuestions();
    if (!questions) {
      res.status(404).json({ message: "Failed to get Questions" });
    }
    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.getQuestionById = async (req, res) => {
  try {
    const question = await questionService.getQuestionById(req.params.id);
    if (!question) {
      res.status(404).json({ message: "Failed to get Question" });
    }
    res.json(question);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.createQuestion = async (req, res) => {
  console.log(req.user);
  try {
    const question = await questionService.createQuestion(
      req.body,
      req.user._id
    );

    if (!question) {
      res.status(404).json({ message: "No question Found" });
    }
    res.json(question);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.updateQuestion = async (req, res) => {
  try {
    const question = await questionService.updateQuestion(
      req.params.id,
      req.body
    );
    if (!question) {
      res.status(404).json({ message: "No question Found" });
    }
    res.json(question);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.deleteQuestion = async (req, res) => {
  try {
    await questionService.deleteQuestion(req.params.id);
    res.json({ message: "Question Deleted Successfully.." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
