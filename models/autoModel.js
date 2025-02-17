const { mongoose, Schema } = require("mongoose");

const autoSchema = new Schema({
  isAuto: String,
});

module.exports = mongoose.model("Auto", autoSchema);
