const mongoose = require("mongoose");

const ShortSchema = new mongoose.Schema({
  content: { type: String },
  image: { type: String },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Short", ShortSchema);
