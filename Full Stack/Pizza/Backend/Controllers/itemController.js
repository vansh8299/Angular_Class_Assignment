const itemService = require("../Services/itemService");

exports.getAllItem = async (req, res) => {
  try {
    const items = await itemService.getAllItem();
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch items" });
  }
};

exports.getItemById = async (req, res) => {
  try {
    const item = await itemService.getItemById(req.params.id);
    if (!item) {
      res.status(404).json({ message: "item not found " });
    }
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch item" });
  }
};

exports.deleteItem = async (req, res) => {
  try {
    await itemService.deleteItem(req.params.id);

    res.json({ message: "Item deleted Successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateItem = async (req, res) => {
  try {
    const item = await itemService.updateItem(req.params.id, req.body);
    if (!item) {
      res.status(404).json({ message: "item not found " });
    }
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createItem = async (req, res) => {
  try {
    const item = await itemService.createItem(req.body);
    if (!item) {
      res.status(404).json({ message: "User not found " });
    }
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: "Failed to create user" });
  }
};
