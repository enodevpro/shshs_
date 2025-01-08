const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));

const userRoute = require("./routes/userRoute");
const db = require("./db/config");

app.use("/user", userRoute);
app.listen(3000, () => {
  db();
  console.log(`Server is running`);
});
