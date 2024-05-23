const Announcement = require("../models/announcementmodel");

exports.getall = async () => {
  try {
    const announcements = await Announcement.find();
    return announcements;
  } catch (err) {
    throw new Error(err.message);
  }
};

exports.getById = async (id) => {
  try {
    const announcement = await Announcement.findById(id);
    return announcement;
  } catch (err) {
    throw new Error(err.message);
  }
};

exports.create = async (newFields, id) => {
  const newAnnouncement = new Announcement(newFields);
  const maxMemberId = await Announcement.findOne({}, {}, { sort: { id: -1 } });
  const newMemberId = maxMemberId ? maxMemberId.id + 1 : 1;
  newMemberId.id = newMemberId;
  return await newAnnouncement.save();
};

exports.updateAnnouncement = async (id, updatedFields) => {
  try {
    const announcement = await Announcement.findOneAndUpdate(
      { _id: id },
      updatedFields,
      { new: true }
    );
    return announcement;
  } catch (error) {
    throw new Error("Error updating announcement: " + error.message);
  }
};

exports.delete = async (id) => {
  try {
    const announcement = await Announcement.findOneAndDelete({
      id: req.params.id,
    });
    return announcement;
  } catch (err) {
    throw new Error(err.message);
  }
};
