const router = require("express").Router();
const {
  createUser,
  getUsers,
  deleteAllUsers,
  counterUsers,
} = require("../controllers/userController");

router.post("/", createUser);
router.get("/", getUsers);
router.delete("/", deleteAllUsers);
router.get("/counter", counterUsers);

module.exports = router;
