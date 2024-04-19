const mongoose = require("mongoose");
const memberSchema = new mongoose.Schema({
  member_id: Number,
  name: String,
});

module.exports = mongoose.model("Mem", memberSchema);
