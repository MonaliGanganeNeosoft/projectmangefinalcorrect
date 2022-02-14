const mongoose = require("mongoose");
const projectDetailsSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, "pls enter title"],
  },
  description: {
    type: String,
    required: [true, "pls enter Description"],
    minlength: [10, "Description is not empty"],
  },

  images: [
    {
      type: String,
      required: false,
    },
  ],
  text: {
    type: String,
    required: true,
  },

  demo_URL: {
    type: String,
    required: [true, "pls enter demo"],
  },
  github_URL: {
    type: String,
    required: [true, "pls enter github"],
  },

  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("ProjectDetails", projectDetailsSchema);
