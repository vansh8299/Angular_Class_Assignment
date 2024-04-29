const express = require("express");
const router = express.Router();
const { authenticate, authorize } = require("../Middleware/authMiddleware");
const itemController = require("../Controllers/itemController");

router.get("/", authenticate, itemController.getAllItem);

router.get("/:id", authenticate, itemController.getItemById);

router.post("/", authenticate, authorize("admin"), itemController.createItem);

router.put("/:id", authenticate, authorize("admin"), itemController.updateItem);

router.delete(
  "/:id",
  authenticate,
  authorize("admin"),
  itemController.deleteItem
);

module.exports = router;
