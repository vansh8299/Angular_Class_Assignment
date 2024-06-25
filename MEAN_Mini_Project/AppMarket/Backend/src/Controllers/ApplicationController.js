const ApplicatiionService = require("../Services/ApplicationService");
const downloadService = require("../Services/downloadService");
const commentService = require("../Services/CommentService");
exports.getAllApplications = async (req, res) => {
  try {
    const { genre, Name, ratings } = req.query;
    const applications = await ApplicatiionService.getAllApplications(
      genre,
      Name,
      ratings
    );
    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch applications" });
  }
};

exports.getAllApplicationById = async (req, res) => {
  try {
    const application = await ApplicatiionService.getApplicationById(
      req.params.id
    );
    if (!application) {
      res.status(404).json({ message: "Application not found " });
    }
    res.json(application);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch applications" });
  }
};

exports.deleteApplication = async (req, res) => {
  try {
    await ApplicatiionService.deleteApplication(req.params.id);
    res.json({ message: "Application deleted Successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateApplication = async (req, res) => {
  try {
    const application = await ApplicatiionService.updateApplication(
      req.params.id,
      req.body
    );
    if (!application) {
      res.status(404).json({ message: "Application not found " });
    }
    res.json(application);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createApplication = async (req, res) => {
  try {
    const application = await ApplicatiionService.createApplication(
      req.body,
      req.user._id
    );
    if (!application) {
      res.status(404).json({ message: "Application not found " });
    }
    res.json(application);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
