const express = require("express");
const router = express.Router();
const favoritesController = require("../Controllers/favoritesAppController");
const { favouritecount } = require("../Middleware/authMiddleware");
router.get("/", favoritesController.getAllFavorites);
router.post("/:id", favouritecount, favoritesController.addToFavorites);
router.delete("/:id", favoritesController.removeFromFavorites);

module.exports = router;
