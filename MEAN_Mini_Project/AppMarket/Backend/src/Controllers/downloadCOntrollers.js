const downloadService = require("../Services/downloadService");

exports.getAllDownloads = async (req, res) => {
  try {
    const downloadapp = await downloadService.getAllDownloads(req.user._id);

    res.json(downloadapp);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.addToDownloads = async (req, res) => {
  try {
    await downloadService.addToDownloads(req.user._id, req.params.id);
    res.status(200).json({ message: "Application added to downloads" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.removeFromDownloads = async (req, res) => {
  try {
    await downloadService.removeFromDownloads(req.user._id, req.params.id);

    res.status(200).json({ message: "Application removed Favourites" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
