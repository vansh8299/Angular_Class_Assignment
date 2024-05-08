const express = require("express");
const router = express.Router();
const playlistController = require("../Controllers/playlistController");
const {
  authenticateUser,
  authorizeUser,
  authorizeCreator,
  authorizePlaylist,
} = require("../Middleware/authMiddleware");

router.get(
  "/",
  authorizeUser("user"),
  authorizePlaylist,
  playlistController.getAllPlaylist
);
router.get(
  "/:id",
  authorizeUser("user"),
  authorizePlaylist,
  playlistController.getAllPlaylistById
);
router.post(
  "/",
  authorizeUser("user"),

  playlistController.createPlaylist
);
router.put(
  "/:id",
  authorizeUser("user"),
  authorizePlaylist,
  playlistController.updatePlaylist
);
router.delete(
  "/:id",
  authorizeUser("user"),
  authorizePlaylist,
  playlistController.deletePlaylist
);

module.exports = router;
