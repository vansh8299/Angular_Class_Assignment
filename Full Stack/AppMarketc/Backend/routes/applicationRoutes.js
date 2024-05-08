const express = require("express");
const router = express.Router();
const { authorize, viewscount } = require("../Middleware/authMiddleware.js");
const applicationController = require("../Controllers/applicationController.js");

router.get("/", applicationController.getAllApplications);
router.get("/sort", applicationController.sortApplicationsByRatings);
router.get("/:id", viewscount, applicationController.getAllApplicationById);
router.post("/", authorize("admin"), applicationController.createApplication);
router.put("/:id", authorize("admin"), applicationController.updateApplication);
router.delete(
  "/:id",
  authorize("admin"),
  applicationController.deleteApplication
);
router.post(
  "/:id/addRestrictedUser",
  authorize("admin"),
  applicationController.addRestrictedUserToApplication
);
router.post(
  "/:id/removeRestrictedUser",
  applicationController.removeRestrictedUserFromApplication
);

module.exports = router;
