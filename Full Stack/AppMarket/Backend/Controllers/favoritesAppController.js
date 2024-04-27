const favoritesService = require("../Services/favoritesAppService");

exports.getAllFavorites = async (req, res) => {
  try {
    const favapp = await favoritesService.getAllFavorites(req.user_email);

    res.json(favapp);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.addToFavorites = async (req, res) => {
  try {
    await favoritesService.addToFavorites(req.user_email, req.params.id);
    res.status(200).json({ message: "Application added to Favourites" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.removeFromFavorites = async (req, res) => {
  try {
    await favoritesService.removeFromFavorites(req.user_email, req.params.id);

    res.status(200).json({ message: "Application removed Favourites" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
