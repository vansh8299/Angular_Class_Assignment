const express = require("express");
const router = express.Router();

const authController = require("../Controllers/authController");
const { authenticateUser } = require("../Middleware/authMiddleware");
router.post("/register", authController.register);
router.post("/login", authController.login);

router.post("/refresh-token", authController.refreshToken);

module.exports = router;
