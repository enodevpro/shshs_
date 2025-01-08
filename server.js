const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
app.use(cors());

app.use(express.json());

const userRoute = require("./routes/userRoute");
const db = require("./db/config");

app.use("/user", userRoute);
app.listen(3000, () => {
  db();
  console.log(`Server is running`);
});
