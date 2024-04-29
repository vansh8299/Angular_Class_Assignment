const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

exports.authenticate = (req, res, next) => {
  if (req.session.authorization) {
    const token = req.session.authorization["token"];
    if (!token) {
      res.status(401).json({ message: "Unauthorized" });
    }
    jwt.verify(token, "jwt_secret_key", (error, user) => {
      if (error) {
        res.status(401).json({ message: "Unauthorized" });
      }
      req.user_email = req.session.authorization["email"];

      next();
    });
  } else {
    return res.status(403).json({ message: "User not Logged In" });
  }
};

exports.authorize = (requiredRole) => async (req, res, next) => {
  const user_email = req.user_email;
  const user = await User.findOne({ email: user_email });
  if (!user) {
    res.status(401).json({ message: "Unauthorized" });
  }
  if (user.role !== requiredRole) {
    res.status(403).json({ message: "Forbidden" });
  }
  next();
};
