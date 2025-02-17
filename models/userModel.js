const { mongoose, Schema } = require("mongoose");

const userSchema = new Schema({
  id: {
    type: String,
    unique: true,
  },
  username: {
    type: String,
    unique: true,
  },
});

module.exports = mongoose.model("User", userSchema);
