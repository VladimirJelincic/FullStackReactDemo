const jwt = require('jwt-simple');
const User = require('../models/User');
const config = require('../config');

const getToken = user => {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
};

const login = (req, res) => {
  try {
    res.status(200).send({ token: getToken(req.user) });
  } catch (err) {
    return res.status(500).send({ error: 'Error signing in' });
  }
};

const signup = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return res.status(422).send({ error: 'Please provide email and password' });
  }

  const existingUser = await User.findOne({ email: email });

  if (existingUser) {
    return res.status(422).send({ error: 'User with that email already exists' });
  }

  const user = new User({
    email: email,
    password: password
  });

  try {
    await user.save();
    res.status(200).json({ token: getToken(user) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updatePassword = async (req, res) => {
  const {
    user: { id },
    body: { password }
  } = req;

  try {
    const user = await User.findById(id);
    if (user) {
      user.password = password;
      await user.save();
      res.status(200).json({ msg: 'Password succesfully changed' });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

module.exports = { login, signup, updatePassword };
