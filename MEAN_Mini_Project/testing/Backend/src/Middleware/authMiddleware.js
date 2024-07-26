const jwt = require("jsonwebtoken");
const User = require("../Model/User");

// Middleware to authenticate users
const authenticateUser = async (req, res, next) => {
  try {
    const authHeader =
      req.headers["authorization"] || req.headers["Authorization"];
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ message: "Unauthorized: Missing or invalid token" });
    }

    const token = authHeader.split(" ")[1];
    console.log("Token:", token);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded:", decoded);
    const user = await User.findById(decoded.userId);
    console.log("User:", user);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized: Invalid user" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Error:", error);
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};

module.exports = {
  authenticateUser,
};
