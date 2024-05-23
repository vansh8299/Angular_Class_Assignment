const mongoose = require("mongoose");
const annSchema = new mongoose.Schema({
  id: {
    type: Number,
  },
  title: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Announcement", annSchema);
