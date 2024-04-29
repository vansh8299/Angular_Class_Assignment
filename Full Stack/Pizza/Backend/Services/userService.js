const User = require("../models/userModel");
const Order = require("../models/orderModel");

exports.updateUser = async (id, updatedFields) => {
  try {
    const user = await User.findOne(id);
    currentUserRole = user.role;
    // If the user is not an admin, restrict updating certain fields
    if (currentUserRole !== "admin") {
      // If user tries to update status to other than "order placed" or "cancelled", throw an error
      if (
        updatedFields.status &&
        !["order placed", "cancelled"].includes(updatedFields.status)
      ) {
        throw new Error("Unauthorized status update for user.");
      }

      // If the user tries to cancel the order, check if the order is not confirmed by the admin
      if (updatedFields.status === "cancelled") {
        const order = await Order.findById(updatedFields.orderId); // Assuming orderId is passed in updatedFields

        if (!order) {
          throw new Error("Order not found.");
        }

        if (order.status === "confirmed") {
          throw new Error("Cannot cancel order that is confirmed by admin.");
        }
      }
    } else {
      // If the user is an admin, allow updating all fields
      return await User.findByIdAndUpdate(id, updatedFields, { new: true });
    }
  } catch (error) {
    throw new Error("Failed to update user");
  }
};

exports.deleteUser = async (id) => {
  try {
    return await User.findByIdAndDelete(id);
  } catch (error) {
    throw new Error("Failed to delete user");
  }
};
