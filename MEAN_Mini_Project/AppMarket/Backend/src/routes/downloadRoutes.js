const express = require("express");
const router = express.Router();
const downloadControllers = require("../Controllers/downloadCOntrollers");
const {
  authenticateUser,
  authorizeUser,
  authorizeCreator,
} = require("../Middleware/authMiddleware");
router.get(
  "/",
  authenticateUser,
  authorizeUser("user"),
  downloadControllers.getAllDownloads
);
router.post(
  "/:id",
  authenticateUser,
  // authorizeUser("user"),

  downloadControllers.addToDownloads
);
router.delete(
  "/:id",
  authenticateUser,
  authorizeUser("user"),
  downloadControllers.removeFromDownloads
);

module.exports = router;
