const mongoose = require("mongoose");

const hikeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  difficulty: {
    type: String,
    required: true,
    enum: ["easy", "moderate", "difficult"],
  },
  length: {
    type: Number,
    required: true,
    min: 1,
  },
  elevationGain: {
    type: Number,
    required: true,
    min: 0,
  },
  description: {
    type: String,
    required: true,
  },
});

const Hike = mongoose.model("Hike", hikeSchema);

module.exports = Hike;
