const express = require("express");
const router = express.Router();

const orderController = require("../Controllers/orderController");

router.get("/", orderController.getAllOrders);
router.post("/placeorder", orderController.placeOrder);
router.get("/getrev", orderController.getMonthlyRevenue);
router.put("/updatestatus/:id", orderController.updateOrderstatus);

module.exports = router;
