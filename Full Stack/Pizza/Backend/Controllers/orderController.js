// orderController.js
const orderService = require("../Services/orderService");
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await orderService.getAllOrders(req.user_email);
    res.status(200).json(orders);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch orders", error: error.message });
  }
};

exports.placeOrder = async (req, res) => {
  try {
    const order = await orderService.placeOrder(req.user_email, req.body);
    if (!order) {
      res.status(404).json({ message: "Order not found " });
    } else {
      res.json(order);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getMonthlyRevenue = async (req, res) => {
  const { month, year } = req.query;
  try {
    const monthlyRevenue = await orderService.getMonthlyRevenue(month, year);
    res.status(200).json({ revenue: monthlyRevenue });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateOrderstatus = async (req, res) => {
  try {
    const order = await orderService.updateOrderstatus(
      req.params.id,
      req.user_email,
      req.body
    );
    if (!order) {
      res.status(404).json({ message: "order not found " });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
