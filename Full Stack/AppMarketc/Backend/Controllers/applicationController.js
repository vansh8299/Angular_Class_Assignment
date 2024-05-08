const ApplicatiionService = require("../Services/applicationServices.js");
const favService = require("../Services/favoritesAppService.js");

exports.getAllApplications = async (req, res) => {
  try {
    const { category, appName } = req.query;
    const applications = await ApplicatiionService.getAllApplications(
      category,
      appName
    );
    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch applications" });
  }
};

exports.sortApplicationsByRatings = async (req, res) => {
  try {
    const sortedApplications =
      await ApplicatiionService.sortApplicationsByRatings();
    res.json(sortedApplications);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch applications" });
  }
};

exports.getAllApplicationById = async (req, res) => {
  try {
    const application = await ApplicatiionService.getApplicationById(
      req.params.id,
      req.user_email
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
    await ApplicatiionService.deleteApplication(req.user_email, req.params.id);
    await favService.deleteFromFavorites(req.params.id);
    res.json({ message: "Application deleted Successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateApplication = async (req, res) => {
  try {
    const application = await ApplicatiionService.updateApplication(
      req.user_email,
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
      req.user_email,
      req.body
    );
    if (!application) {
      res.status(404).json({ message: "Application not found " });
    }
    res.json(application);
  } catch (error) {
    res.status(500).json({ message: "Failed to create applications" });
  }
};

exports.addRestrictedUserToApplication = async (req, res) => {
  const { userId } = req.query;
  try {
    await ApplicatiionService.addRestrictedUser(
      req.user_email,
      req.params.id,
      userId
    );
    res.json({ message: "User added to restricted list successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.removeRestrictedUserFromApplication = async (req, res) => {
  try {
    const { userId } = req.query;
    await ApplicatiionService.removeRestrictedUser(
      req.user_email,
      req.params.id,
      userId
    );
    res.json({ message: "User removed from restricted list successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
