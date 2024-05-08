const userService = require("../Services/userService");

exports.deleteUser = async (req, res) => {
  try {
    await userService.deleteUser(req.params.id);

    res.json({ message: "User deleted Successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
