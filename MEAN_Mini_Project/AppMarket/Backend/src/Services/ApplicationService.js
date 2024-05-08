const Application = require("../Model/Application");
const Comment = require("../Model/Comment");
const User = require("../Model/User");

exports.getAllApplications = async (genre, Name, ratings) => {
  try {
    let query = { visibility: true };
    if (genre) {
      query.genre = genre;
    }
    if (Name) {
      query.Name = { $regex: new RegExp(Name, "i") };
    }
    if (ratings) {
      query.ratings = ratings;
    }
    return await Application.find(query).populate("comments");
  } catch (error) {
    throw new Error("Failed to fetch the application");
  }
};

exports.getApplicationById = async (id) => {
  try {
    const application = await Application.findById(id);

    if (!application) {
      throw new Error("Application not found");
    }

    return application;
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.createApplication = async (newFields, id) => {
  newFields.user = id;
  const newApplication = new Application(newFields);
  return await newApplication.save();
};

exports.updateApplication = async (id, updatedFields) => {
  const application = Application.findById(id);

  if (application.visibility == true && updatedFields.visibility == false) {
    await User.updateMany({ downloads: id }, { $pull: { downloads: id } });
  }
  return await Application.findByIdAndUpdate(id, updatedFields, { new: true });
};

exports.deleteApplication = async (id) => {
  try {
    await Comment.deleteMany({ application: id });
    await User.updateMany({ downloads: id }, { $pull: { downloads: id } });
    return await Application.findByIdAndDelete(id);
  } catch (error) {
    throw new Error(error.message);
  }
};
