const express = require("express");
const router = express.Router();
const { authenticateUser, authorize } = require("../Middleware/authMiddleware");
const itemController = require("../Controllers/itemController");

router.get("/", authenticateUser, itemController.getAllItem);

router.get("/:id", authenticateUser, itemController.getItemById);

router.post(
  "/",
  authenticateUser,
  authorize("admin"),
  itemController.createItem
);

router.put(
  "/:id",
  authenticateUser,
  authorize("admin"),
  itemController.updateItem
);

router.delete(
  "/:id",
  authenticateUser,
  authorize("admin"),
  itemController.deleteItem
);

module.exports = router;
