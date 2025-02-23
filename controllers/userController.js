const expressAsyncHandler = require("express-async-handler");
const { mongoose } = require("mongoose");
const User = require("../models/userModel");
const createUser = expressAsyncHandler(async (req, res) => {
  const { id, username } = req.body;

  if (!id) return res.status(403).json({ message: "Missing data" });

  // Kiểm tra xem id đã tồn tại chưa
  const existingUser = await User.findOne({ id });
  if (existingUser)
    return res.status(409).json({ message: "ID already exists" });

  // Tạo user mới nếu id chưa tồn tại
  const newUser = await User.create({ id, username });

  if (!newUser)
    return res.status(500).json({ message: "Failed to create user" });

  return res
    .status(201)
    .json({ message: "Successfully created", user: newUser });
});

const deleteUser = expressAsyncHandler(async (req, res) => {});
const LockSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  isLocked: { type: Boolean, default: false },
  lastLockedAt: { type: Date },
});

const Lock = mongoose.model("Lock", LockSchema);

// Hàm để release lock
const releaseLock = async (lockName) => {
  await Lock.updateOne({ name: lockName }, { isLocked: false });
};

const getUsers = expressAsyncHandler(async (req, res) => {
  const lockName = "getUsersLock";

  try {
    // Đếm tổng số user
    const totalUsers = await User.countDocuments();

    // Xác định limit dựa vào tổng số user
    const limit = totalUsers > 20 ? 20 : totalUsers;

    if (limit === 0) {
      await releaseLock(lockName);
      return res.status(404).json({ message: "No data yet" });
    }

    // Sử dụng findOneAndDelete để đảm bảo atomicity
    const documents = [];
    for (let i = 0; i < limit; i++) {
      const doc = await User.findOneAndDelete({});
      if (!doc) break;
      documents.push(doc);
    }

    // Tạo chuỗi text chứa các id
    const text = documents.map((doc) => doc.id).join(",");

    await releaseLock(lockName);
    return res.status(200).send(text);
  } catch (error) {
    // Đảm bảo release lock trong trường hợp có lỗi
    await releaseLock(lockName);
    throw error;
  }
});

const triggerAuto = expressAsyncHandler(async (req, res) => {
  const { trigger } = req.params;
  await Auto.create({
    isAuto: trigger,
  });
});
const deleteAllUsers = expressAsyncHandler(async (req, res) => {
  await User.deleteMany({});
  return res.status(200).json({
    message: "deleted",
  });
});

const counterUsers = expressAsyncHandler(async (req, res) => {
  const count = await User.countDocuments();
  res.status(200).send(`${count}`);
});

module.exports = {
  createUser,
  deleteUser,
  getUsers,
  deleteAllUsers,
  counterUsers,
};
