const express = require("express");
const router = express.Router();
const applicationController = require("../Controllers/ApplicationController");

const { authorizeUser } = require("../Middleware/authMiddleware");

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
  applicationController.updateApplication
);
router.delete(
  "/:id",
  authorizeUser("admin"),
  applicationController.deleteApplication
);

module.exports = router;
