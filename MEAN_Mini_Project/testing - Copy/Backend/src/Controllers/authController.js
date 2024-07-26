const authService = require("../Services/authService");

exports.register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const message = await authService.register(username, email, password);
    res.status(201).json({ message });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const { token, refreshToken, user } = await authService.login(
      username,
      password
    );
    res.cookie("authenticationToken", token);
    res.cookie("refreshToken", refreshToken);
    res.json([token, refreshToken, user]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const jwt = require("jsonwebtoken");

exports.refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return res.status(400).json({ message: "Refresh token required" });
    }

    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const token = jwt.sign({ userId: decoded.userId }, process.env.JWT_SECRET, {
      expiresIn: "60s",
    });

    console.log("New token generated:", token);
    return res.json({ token });
  } catch (error) {
    console.error("Refresh token error:", error.message);
    return res.status(401).json({ message: "Invalid refresh token" });
  }
};
