const User = require("../Model/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.register = async (name, email, password) => {
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error("User already exists");
    }
    const newUser = new User({ name, email, password });
    await newUser.save();
    return "User registered successfully";
  } catch (error) {
    throw error;
  }
};

exports.login = async (email, password) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("Invalid email");
    }

    const isMatch = await user.checkPassword(password);
    if (!isMatch) {
      throw new Error("Invalid password");
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: 3600,
    });
    return token;
  } catch (error) {
    throw error;
  }
};
