const Application = require("../models/Application.js");
const User = require("../models/User.js");
exports.getAllApplications = async (category, appName) => {
  try {
    let query = {};
    if (category) {
      query.genre = category;
    }
    if (appName) {
      query.appName = { $regex: new RegExp(appName, "i") };
    }
    return await Application.find(query).populate("user");
  } catch (error) {
    throw new Error("Failed to fetch the application");
  }
};
exports.sortApplicationsByRatings = async () => {
  try {
    return await Application.find().sort({ ratings: -1 }).populate("user");
  } catch (error) {
    throw new Error("Failed to fetch applications");
  }
};
exports.getApplicationById = async (id, userEmail) => {
  try {
    const user = await User.findOne({ email: userEmail });
    const application = await Application.findById(id);

    if (!application) {
      throw new Error("Application not found");
    }

    if (application.restrictedUsers.includes(user._id)) {
      throw new Error("Access to this application is restricted");
    }

    return application;
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.createApplication = async (email, newFields) => {
  const admin = await User.findOne({ email });
  newFields.user = admin._id;
  const newApplication = new Application(newFields);
  return await newApplication.save();
};

exports.updateApplication = async (email, id, updatedFields) => {
  const admin = await User.findOne({ email });
  const application = await Application.findById(id);
  if (application.user.toString() !== admin._id.toString()) {
    throw new Error("Forbidden");
  }
  return await Application.findByIdAndUpdate(id, updatedFields, { new: true });
};

exports.deleteApplication = async (email, id) => {
  const admin = await User.findOne({ email });
  const application = await Application.findById(id);

  if (application.user.toString() !== admin._id.toString()) {
    throw new Error("Forbidden");
  }
  return await Application.findByIdAndDelete(id);
};

exports.addRestrictedUser = async (adminEmail, appId, userId) => {
  const admin = await User.findOne({ email: adminEmail });

  const application = await Application.findById(appId);
  if (!application) {
    throw new Error("Application not found");
  }

  if (application.user.toString() !== admin._id.toString()) {
    throw new Error(
      "Forbidden: Only the application owner can add restricted users"
    );
  }

  const userToAdd = await User.findById(userId);
  if (!userToAdd) {
    throw new Error("User not found");
  }

  if (!application.restrictedUsers.includes(userId)) {
    application.restrictedUsers.push(userId);
    await application.save();
  }
};

exports.removeRestrictedUser = async (adminEmail, appId, userId) => {
  const admin = await User.findOne({ email: adminEmail });
  const application = await Application.findById(appId);
  if (!application || application.user.toString() !== admin._id.toString()) {
    throw new Error("Forbidden");
  }
  if (application.restrictedUsers.includes(userId)) {
    application.restrictedUsers = application.restrictedUsers.filter(
      (user) => user.toString() !== userId.toString()
    );
    await application.save();
  }
};
