const { mongoose } = require("mongoose");

const db = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("DB Connected");
  } catch (error) {
    throw new Error(error);
  }
};
module.exports = db;
