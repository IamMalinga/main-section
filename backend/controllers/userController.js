const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { SECRET } = require('../config');

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = new User({ email, password });
  await user.save();
  res.status(201).send('User created');
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).send('Invalid credentials');
  const isMatch = await user.comparePassword(password);
  if (!isMatch) return res.status(400).send('Invalid credentials');
  const token = jwt.sign({ id: user._id }, SECRET);
  res.json({ token });
};

module.exports = { register, login };
