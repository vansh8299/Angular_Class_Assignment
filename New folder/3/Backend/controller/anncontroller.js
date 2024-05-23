const annService = require("../service/annservice");

exports.getall = async (req, res) => {
  try {
    const announcements = await annService.getall();
    res.status(200).json(announcements);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getbyId = async (req, res) => {
  try {
    const announcement = await annService.getById(req.params.id);
    if (!announcement) {
      res.status(404).json({ message: "Announcement not found" });
    }
    res.status(200).json(announcement);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

exports.delete = async (req, res) => {
  try {
    await annService.delete(req.params.id);
    res.status(200).json({ message: "Announcement deleted" });
  } catch (err) {
    res.status(500).json(err.message);
  }
};

exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedFields = req.body;
    const announcement = await announcementService.updateAnnouncement(
      id,
      updatedFields
    );
    if (!announcement) {
      return res.status(404).json({ message: "Announcement not found" });
    }
    res.status(200).json(announcement);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const announcement = await annService.create(req.body);
    if (!announcement) {
      res.status(404).json({ message: "Announcement not created" });
    }
    res.status(200).json(announcement);
  } catch (err) {
    res.status(500).json(err.message);
  }
};
