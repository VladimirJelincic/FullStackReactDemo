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
const likeUser = async (req, res) => {
  const {
    params: { id },
    user: { _id }
  } = req;
  const sourceUserId = _id.toString();
  if (id === sourceUserId) {
    res.status(422).json({ error: 'Cannot like oneself' });
  } else {
    const user = await User.findById(id);
    if (user) {
      if (user.likedBy.includes(sourceUserId)) {
        res.status(422).json({ error: 'User has already been liked' });
      } else {
        user.likedBy.push(sourceUserId);
        await user.save();
        res.status(200).json({ 'msg:': 'User has been liked' });
      }
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  }
};
const unlikeUser = async (req, res) => {
  const {
    params: { id },
    user: { _id }
  } = req;
  const sourceUserId = _id.toString();
  if (id === sourceUserId) {
    res.status(422).json({ error: 'Cannot unlike oneself' });
  } else {
    const user = await User.findById(id);
    if (user) {
      const index = user.likedBy.indexOf(sourceUserId);
      if (index === -1) {
        res.status(422).json({ error: 'User has already been unliked' });
      } else {
        user.likedBy.splice(index, 1);
        await user.save();
        res.status(200).json({ 'msg:': 'User has been unliked' });
      }
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  }
};
const getUsers = async (req, res) => {
  const users = await User.find({}, ['email', 'likes'], { sort: { likes: -1 } });
  res.status(200).json(users);
};
module.exports = { getMe, getUser, likeUser, unlikeUser, getUsers };
