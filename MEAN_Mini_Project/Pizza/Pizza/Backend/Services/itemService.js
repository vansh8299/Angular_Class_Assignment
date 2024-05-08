const Item = require("../models/itemModel");

exports.getAllItem = async () => {
  try {
    return await Item.find();
  } catch (error) {
    throw new Error("Failed to fetch items");
  }
};

exports.getItemById = async (id) => {
  try {
    const item = await Item.findById(id);
    if (!item) {
      throw new Error("Item not found");
    }
    return item;
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.createItem = async (newFields) => {
  try {
    const newItem = new Item(newFields);
    return await newItem.save();
  } catch (error) {
    throw new Error("Failed to create item");
  }
};

exports.updateItem = async (id, updatedFields) => {
  try {
    const updatedItem = await Item.findByIdAndUpdate(id, updatedFields, {
      new: true,
    });
    if (!updatedItem) {
      throw new Error("Item not found");
    }
    return updatedItem;
  } catch (error) {
    throw new Error("Failed to update item");
  }
};

exports.deleteItem = async (id) => {
  try {
    const deletedItem = await Item.findByIdAndDelete(id);
    if (!deletedItem) {
      throw new Error("Item not found");
    }
    return deletedItem;
  } catch (error) {
    throw new Error("Failed to delete item");
  }
};
