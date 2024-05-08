const Order = require("../models/orderModel");
const User = require("../models/userModel");
const Item = require("../models/itemModel");
const mongoose = require("mongoose");

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

exports.placeOrder = async (email, itemIds) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("User not found");
    }

    const extractedItemIds = Array.isArray(itemIds) ? itemIds : itemIds.items;

    const isValidItemIds = extractedItemIds.every((id) =>
      mongoose.Types.ObjectId.isValid(id)
    );
    if (!isValidItemIds) {
      throw new Error("Invalid item IDs");
    }

    const items = await Item.find({ _id: { $in: extractedItemIds } });
    if (!items || items.length === 0) {
      throw new Error("Items not found");
    }

    let totalAmount = 0;
    for (const itemId of extractedItemIds) {
      const item = items.find((item) => item._id.toString() === itemId);
      if (!item) {
        throw new Error(`Item with ID ${itemId} not found`);
      }
      totalAmount += item.price;
    }

    const order = new Order({
      user: user._id,
      items: extractedItemIds,
      amount: totalAmount,
      status1: "order placed",
      status2: "pending",
    });

    const savedOrder = await order.save();

    return savedOrder;
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.getMonthlyRevenue = async (month, year) => {
  try {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0, 23, 59, 59);

    const orders = await Order.find({
      timestamp: {
        $gte: startDate.getTime(),
        $lte: endDate.getTime(),
      },
      status2: "delivered",
    }).sort({ timestamp: 1 });

    console.log(orders);

    const totalRevenue = orders.reduce(
      (total, order) => total + order.amount,
      0
    );

    return totalRevenue;
  } catch (error) {
    throw new Error("Failed to calculate monthly revenue");
  }
};

exports.updateOrderstatus = async (id, email, updatedFields) => {
  try {
    const user = await User.findOne({ email });
    const order = await Order.findById(id);
    currentUserRole = user.role;
    if (currentUserRole !== "admin") {
      if (order.status2 === "confirmed") {
        throw new Error("Unauthorized status update for user.");
      } else {
        return await Order.findByIdAndUpdate(id, updatedFields, {
          new: true,
        });
      }
    } else {
      return await Order.findByIdAndUpdate(id, updatedFields, {
        new: true,
      });
    }
  } catch (error) {
    throw new Error("Failed to update user");
  }
};
