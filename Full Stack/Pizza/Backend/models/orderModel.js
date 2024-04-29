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
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: [
      "order placed",
      "pending",
      "confirmed",
      "preparation",
      "delivered",
      "cancelled",
    ],
    default: "order placed",
  },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
