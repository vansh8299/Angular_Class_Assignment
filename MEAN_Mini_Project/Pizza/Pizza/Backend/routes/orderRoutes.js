const express = require("express");
const router = express.Router();

const orderController = require("../Controllers/orderController");
const {
  authenticateUser,
  authorize,
  authorizeCreator,
} = require("../Middleware/authMiddleware");

router.get(
  "/",
  authenticateUser,
  authorizeCreator,
  orderController.getAllOrders
);
router.post("/placeorder", authenticateUser, orderController.placeOrder);
router.get(
  "/getrev",
  authenticateUser,
  authorize("admin"),
  orderController.getMonthlyRevenue
);
router.put(
  "/updatestatus/:id",
  authenticateUser,

  orderController.updateOrderstatus
);

module.exports = router;
