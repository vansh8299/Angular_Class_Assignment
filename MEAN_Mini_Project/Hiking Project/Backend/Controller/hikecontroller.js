const hikeService = require("../Service/hikeService");
exports.getTrails = async (req, res) => {
  try {
    const trails = await hikeService.getTrails();
    res.json(trails);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch trails" });
  }
};

exports.getTrailById = async (req, res) => {
  try {
    const trail = await hikeService.getTrailById(req.params.id);
    if (!trail) {
      res.status(404).json({ message: "trail not found " });
    }
    res.json(trail);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch trail" });
  }
};

exports.deletetrail = async (req, res) => {
  try {
    await hikeService.deletetrail(req.params.id);
    res.json({ message: "Trail deleted Successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updatetrail = async (req, res) => {
  try {
    const trail = await hikeService.updatetrail(req.params.id, req.body);
    if (!trail) {
      res.status(404).json({ message: "trail not found " });
    }
    res.json(trail);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createtrail = async (req, res) => {
  try {
    const trail = await hikeService.createtrail(req.body);
    if (!trail) {
      res.status(404).json({ message: "trail not found " });
    }
    res.json(trail);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.locationsearch = async (req, res) => {
  const { location } = req.query;
  try {
    const trails = await hikeService.locationsearch(location);
    res.json(trails);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.difficultsearch = async (req, res) => {
  const { difficulty } = req.query;
  try {
    const trails = await hikeService.difficultsearch(difficulty);
    res.json(trails);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch trails" });
  }
};

exports.minlengthsearch = async (req, res) => {
  const { minLength } = req.query;
  try {
    const trails = await hikeService.minlengthsearch(minLength);
    res.json(trails);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch trails" });
  }
};
exports.maxlengthsearch = async (req, res) => {
  const { maxLength } = req.query;
  try {
    const trails = await hikeService.maxlengthsearch(maxLength);
    res.json(trails);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch trails" });
  }
};

exports.minelevationsearch = async (req, res) => {
  const { minElevation } = req.query;
  try {
    const trails = await hikeService.minelevationsearch(minElevation);
    res.json(trails);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch trails" });
  }
};

exports.maxelevationsearch = async (req, res) => {
  const { maxElevation } = req.query;
  try {
    const trails = await hikeService.maxelevationsearch(maxElevation);
    res.json(trails);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch trails" });
  }
};
