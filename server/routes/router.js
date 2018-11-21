const passport = require('passport');
const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });
const { login, signup, updatePassword } = require('../lib/authentication');
const { getMe, getUser, likeUser, unlikeUser, getUsers } = require('../lib/user');

const passportInstance = require('../lib/passport');

const router = app => {
  app.post('/signup', signup);
  app.post('/login', requireSignin, login);
  app.get('/me', requireAuth, getMe);
  app.post('/me/update-password', requireAuth, updatePassword);
  app.get('/user/:id', getUser);
  app.post('/user/:id/like', requireAuth, likeUser);
  app.post('/user/:id/unlike', requireAuth, unlikeUser);
  app.get('/most-liked', getUsers);
};

module.exports = router;
