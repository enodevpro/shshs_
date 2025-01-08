const router = require("express").Router();
const {
  createUser,
  getUsers,
  deleteAllUsers,
} = require("../controllers/userController");

router.post("/", createUser);
router.get("/", getUsers);
router.delete("/", deleteAllUsers);

module.exports = router;
