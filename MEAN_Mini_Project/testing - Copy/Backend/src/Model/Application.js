const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
    app_name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },

    imageurl: {
      type: String,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Application = mongoose.model("Application", applicationSchema);

module.exports = Application;
