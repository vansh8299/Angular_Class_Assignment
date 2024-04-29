const express = require("express");
const router = express.Router();

const orderController = require("../Controllers/orderController");

router.get("/", orderController.getAllOrders);
router.post("/placeorder", orderController.placeOrder);

module.exports = router;
