const User = require("../models/UserModel");

const getUsers = async (req, res) => {
  const users = await User.find({});
  res.status(200).json(users);
};

const createUser = async (req, res) => {
  const { email, username, password } = req.body;
  const user = new User({ email, username });
  const registeredUser = await User.register(user, password);
};

module.exports = { getUsers, createUser };
