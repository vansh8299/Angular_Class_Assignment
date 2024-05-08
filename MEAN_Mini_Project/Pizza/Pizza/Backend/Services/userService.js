const User = require("../models/userModel");
const Order = require("../models/orderModel");

exports.deleteUser = async (id) => {
  try {
    return await User.findByIdAndDelete(id);
  } catch (error) {
    throw new Error("Failed to delete user");
  }
};
