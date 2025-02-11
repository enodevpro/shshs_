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
  const limit = 100;
  // lấy 20 tài khoản
  const documents = await User.find().limit(limit);
  if (documents.length >= limit) {
    // lấy id
    const ids = documents.map((doc) => doc._id);
    console.log(ids);
    await User.deleteMany({ _id: { $in: ids } });
    let text = "";
    documents.forEach((doc) => {
      text += doc.id + ",";
    });
    return res.status(200).send(text);
  }
  if (documents.length < limit)
    return res.status(404).json({ message: "No data yet" });
  console.log(documents);
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
