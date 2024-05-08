const User = require("../Model/User");
const Application = require("../Model/Application");
const mongoose = require("mongoose");

exports.getAllDownloads = async (userid) => {
  try {
    const user = await User.findOne({ _id: userid });
    return user.downloads;
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.addToDownloads = async (userid, appId) => {
  try {
    const application = await Application.findById(appId);
    application.incDownloadCount();
    await User.updateOne({ _id: userid }, { $addToSet: { downloads: appId } });
    return User.findById(userid).downloads;
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.removeFromDownloads = async (userid, appId) => {
  try {
    const application = await Application.findById(appId);
    application.decDownloadCount();
    await User.updateOne({ _id: userid }, { $pull: { downloads: appId } });
    return User.findById(userid).downloads;
  } catch (error) {
    throw new Error(error.message);
  }
};
