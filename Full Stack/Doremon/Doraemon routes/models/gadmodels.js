const mongoose = require("mongoose");
const gadSchema = new mongoose.Schema({
  gad_id: Number,
  name: String,
  color: String,
});

module.exports = mongoose.model("Gad", gadSchema);
