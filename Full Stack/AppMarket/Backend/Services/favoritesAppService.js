const User = require("../models/User");
const mongoose = require("mongoose");

exports.getAllFavorites = async (email) => {
  try {
    const user = await User.findOne({ email }).populate("favouriteApplication");
    return user.favouriteApplication;
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.addToFavorites = async (email, appId) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("User not found");
    }
    user.favouriteApplication.push(appId);
    await user.save();
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.removeFromFavorites = async (email, appId) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("User not found");
    }
    user.favouriteApplication = user.favouriteApplication.filter(
      (app) => app.toString() !== appId
    );

    await user.save();
  } catch (error) {
    throw new Error(error.message);
  }
};
exports.deleteFromFavorites = async (id) => {
  try {
    const users = await User.find();
    users.forEach((user) => {
      if (user.favouriteApplication.includes(id)) {
        this.removeFromFavorites(user.email, id);
      }
    });
  } catch (error) {
    throw new Error(error.message);
  }
};
