const express = require("express");
const router = express.Router();
const { authorize } = require("../Middleware/authMiddleware");

const userController = require("../Controllers/userController");

router.delete("/:id", authorize("admin"), userController.deleteUser);

module.exports = router;
