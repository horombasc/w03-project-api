// controllers/usersController.js
const User = require('../models/User');

exports.getAllUsers = async (req, res) => {
  const users = await User.find().limit(200);
  res.json(users);
};

exports.createUser = async (req, res) => {
  const { name, email, googleId, role } = req.body;
  const exists = await User.findOne({ email });
  if (exists) return res.status(409).json({ message: 'User with this email already exists' });
  const user = new User({ name, email, googleId, role });
  await user.save();
  res.status(201).json(user);
};
