const expressAsyncHandler = require("express-async-handler");
const { mongoose } = require("mongoose");
const User = require("../models/userModel");
const createUser = expressAsyncHandler(async (req, res) => {
  const { id, username } = req.body;
  console.log(id);
  if (!id) return res.status(403).json({ message: "Missing data" });

  const newUser = await User.create({
    id: id,
    username: username,
  });
  if (!newUser) return res.status(204).json({ message: "Failed" });
  return res.status(201).json({ message: "sucessfully" });
});
const deleteUser = expressAsyncHandler(async (req, res) => {});
const getUsers = expressAsyncHandler(async (req, res) => {
  // Đếm tổng số user
  const totalUsers = await User.countDocuments();

  // Xác định limit dựa vào tổng số user
  const limit = totalUsers > 50 ? 50 : totalUsers;

  if (limit === 0) {
    return res.status(404).json({ message: "No data yet" });
  }

  // Lấy danh sách user theo limit
  const documents = await User.find().limit(limit);

  // Lấy id của các user để xóa
  const ids = documents.map((doc) => doc._id);

  // Xóa các user đã lấy
  await User.deleteMany({ _id: { $in: ids } });

  // Tạo chuỗi text chứa các id
  const text = documents.map((doc) => doc.id).join(",");

  return res.status(200).send(text);
});
// lưu lại những id đã bị trộm xong
const saveIdsThief = expressAsyncHandler(async (req, res) => {});
const deleteAllUsers = expressAsyncHandler(async (req, res) => {
  await User.deleteMany({});
  return res.status(200).json({
    message: "deleted",
  });
});

module.exports = { createUser, deleteUser, getUsers, deleteAllUsers };
