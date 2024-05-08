const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  items: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Item",
    },
  ],
  amount: {
    type: Number,
  },
  status1: {
    type: String,
    required: true,
    enum: ["order placed", "cancelled"],
    default: "order placed",
  },
  status2: {
    type: String,
    required: true,
    enum: ["pending", "confirmed", "preparation", "delivered"],
    default: "pending",
  },
  timestamp: {
    type: Number,
    default: Date.now,
  },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
