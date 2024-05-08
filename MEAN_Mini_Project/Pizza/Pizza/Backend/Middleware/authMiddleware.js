const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const Order = require("../models/orderModel");

// Middleware to authenticate users
const authenticateUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};

const authorize = (requiredRole) => async (req, res, next) => {
  try {
    const user = req.user;
    if (user.role !== requiredRole) {
      return res.status(403).json({
        message: "Forbidden: You are not authorized to access this resource",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const authorizeCreator = async (req, res, next) => {
  try {
    const userId = req.user._id;
    console.log(userId);

    const order = await Order.findOne({ user: userId });
    if (!order) {
      return res.status(404).json({ message: "order not found" });
    }
    if (order.user.toString() !== userId.toString()) {
      return res.status(403).json({
        message: "Forbidden: You are not the creator of this order",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  authenticateUser,
  authorize,
  authorizeCreator,
};
