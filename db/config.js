const { mongoose } = require("mongoose");

const db = async () => {
  try {
    await mongoose.connect("MONGO_URL=mongodb://localhost:27017/avatar2");
    console.log("DB Connected");
  } catch (error) {
    throw new Error(error);
  }
};
module.exports = db;
