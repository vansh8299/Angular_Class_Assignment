const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  itemname: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: ["Veg", "Non-Veg", "Cheese Burst", "Bevereges"],
  },
  price: {
    type: Number,
    required: true,
  },
});

const Item = mongoose.model("Item", itemSchema);

module.exports = Item;
