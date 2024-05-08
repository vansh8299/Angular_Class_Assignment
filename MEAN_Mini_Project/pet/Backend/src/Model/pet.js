const mongoose = require("mongoose");

const petSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  species: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    required: true,
    enum: ["male", "female", "other"],
  },
  adoptionStatus: {
    type: String,
    required: true,
    default: "available",
  },
  vaccinated: {
    type: Boolean,
    required: true,
    default: false,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

const Pet = mongoose.model("Pet", petSchema);

module.exports = Pet;
