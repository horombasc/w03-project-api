const User = require('../models/User');
const bcrypt = require('bcryptjs');

exports.getAllUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};

exports.getUserById = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json(user);
};

exports.createUser = async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ name, email, password: hashedPassword });
  await newUser.save();
  res.status(201).json({ message: 'User created successfully', user: newUser });
};

exports.updateUser = async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = password ? await bcrypt.hash(password, 10) : undefined;
  const updatedUser = await User.findByIdAndUpdate(
    req.params.id,
    { name, email, ...(hashedPassword && { password: hashedPassword }) },
    { new: true }
  );
  if (!updatedUser) return res.status(404).json({ message: 'User not found' });
  res.json({ message: 'User updated successfully', user: updatedUser });
};

exports.deleteUser = async (req, res) => {
  const deletedUser = await User.findByIdAndDelete(req.params.id);
  if (!deletedUser) return res.status(404).json({ message: 'User not found' });
  res.json({ message: 'User deleted successfully' });
};


