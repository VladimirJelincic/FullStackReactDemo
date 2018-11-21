const User = require('../models/User');

const getMe = async (req, res) => {
  const {
    user: { id }
  } = req;

  try {
    const user = await User.findById(id);
    res.status(200).json(user.toJSON());
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getUser = async (req, res) => {
  const {
    params: { id }
  } = req;
  try {
    const user = await User.findById(id);
    if (user) {
      res.status(200).json(user.toJSON());
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Error fetching user' });
  }
};
module.exports = { getMe, getUser };
