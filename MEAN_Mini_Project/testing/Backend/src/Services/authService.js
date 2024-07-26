const User = require("../Model/User");
const jwt = require("jsonwebtoken");
const RefreshToken = require("../Model/RefreshToken");
require("dotenv").config();

exports.register = async (username, email, password) => {
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error("User already exists");
    }
    const newUser = new User({ username, email, password });
    await newUser.save();
    return "User registered successfully";
  } catch (error) {
    throw error;
  }
};

exports.login = async (username, password) => {
  try {
    const user = await User.findOne({ username });
    if (!user) {
      throw new Error("Invalid username");
    }

    const isMatch = await user.checkPassword(password);
    if (!isMatch) {
      throw new Error("Invalid password");
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "60s",
    });

    const refreshToken = jwt.sign(
      { userId: user._id },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: "7d",
      }
    );

    await RefreshToken.create({ userId: user._id, token: refreshToken });

    return { token, refreshToken, user };
  } catch (error) {
    throw error;
  }
};
