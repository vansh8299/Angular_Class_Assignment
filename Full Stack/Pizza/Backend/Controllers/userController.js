const userService = require("../Services/userService");

exports.getAllUser = async (req, res) => {
  try {
    const users = await userService.getAllUser();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch users" });
  }
};

exports.getAllUserById = async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);
    if (!user) {
      res.status(404).json({ message: "User not found " });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch user" });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await userService.deleteUser(req.params.id);

    res.json({ message: "User deleted Successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const user = await userService.updateUser(req.params.id, req.body);
    if (!user) {
      res.status(404).json({ message: "User not found " });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createUser = async (req, res) => {
  try {
    const user = await userService.createUser(req.body);
    if (!user) {
      res.status(404).json({ message: "User not found " });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Failed to create user" });
  }
};
