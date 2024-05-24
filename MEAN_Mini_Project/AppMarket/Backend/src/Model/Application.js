const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },

    app_name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    release_date: {
      type: Date,
      required: true,
    },

    version: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
      required: true,
      enum: ["Games", "Beauty", "Fashion", "Women", "Health"],
    },
    visibility: {
      type: Boolean,
      default: true,
    },
    Count: {
      type: Number,
      default: 0,
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

applicationSchema.virtual("comments", {
  ref: "Comment",
  localField: "_id",
  foreignField: "application",
});

applicationSchema.virtual("averageRating").get(function () {
  const comments = this.comments;
  if (!comments || comments.length === 0) return 0;

  const totalRatings = comments.length;
  const totalSum = comments.reduce((sum, comment) => sum + comment.rating, 0);
  return totalSum / totalRatings;
});

applicationSchema.methods.incDownloadCount = function () {
  this.Count++;
  return this.save();
};
applicationSchema.methods.decDownloadCount = function () {
  this.Count--;
  return this.save();
};

const Application = mongoose.model("Application", applicationSchema);

module.exports = Application;
