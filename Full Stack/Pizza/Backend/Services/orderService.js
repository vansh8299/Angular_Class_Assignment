const Order = require("../models/orderModel");
const User = require("../models/userModel");
const Item = require("../models/itemModel");

exports.getAllOrders = async (email) => {
  try {
    const user = await User.findOne({ email });
    if (user.role === "admin") {
      return await Order.find();
    } else if (user.role === "user") {
      return await Order.find({ user: user._id });
    }
  } catch (error) {
    throw new Error("Failed to fetch orders");
  }
};

exports.placeOrder = async (email, newField) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("User not found");
    }
    const itemId = newField.items[0];

    const item = await Item.findById(itemId);

    if (!item) {
      throw new Error("Item not found");
    }

    const existingOrder = await Order.findOne({ user: user._id });

    if (!existingOrder) {
      const newOrder = new Order({
        user: user._id,
        items: [itemId],
        amount: item.price,
        status: "order placed",
      });
      const savedOrder = await newOrder.save();
      return savedOrder;
    }

    existingOrder.items.push(itemId);

    let total = 0;
    for (const itemId of existingOrder.items) {
      const item = await Item.findById(itemId);
      console.log(item);

      if (!item) {
        throw new Error(`Item with ID ${itemId} not found`);
      }
      total += item.price;
    }

    existingOrder.amount = total;

    const savedOrder = await existingOrder.save();
    return savedOrder;
  } catch (error) {
    throw new Error(error.message);
  }
};
