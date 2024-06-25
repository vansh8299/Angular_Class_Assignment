const authService = require("../Services/authService");
exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const message = await authService.register(name, email, password);
    res.status(201).json({ message });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const token = await authService.login(email, password);

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
