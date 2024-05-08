const express = require("express");
const router = express.Router();
const applicationController = require("../Controllers/ApplicationController");

const {
  authenticateUser,
  authorizeUser,
  authorizeCreator,
} = require("../Middleware/authMiddleware");

router.get("/", applicationController.getAllApplications);
router.get("/:id", applicationController.getAllApplicationById);
router.post(
  "/",
  authorizeUser("admin"),
  applicationController.createApplication
);
router.put(
  "/:id",
  authorizeUser("admin"),
  authorizeCreator,
  applicationController.updateApplication
);
router.delete(
  "/:id",
  authorizeUser("admin"),
  authorizeCreator,
  applicationController.deleteApplication
);

module.exports = router;
