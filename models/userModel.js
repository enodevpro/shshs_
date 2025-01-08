const { mongoose, Schema } = require("mongoose");

const userSchema = new Schema({
  id: String,
  username: String,
});

module.exports = mongoose.model("User", userSchema);
