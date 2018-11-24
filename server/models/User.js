const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

const validateEmail = email => {
  const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

const UserSchema = new Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    validate: [validateEmail, 'Please fill a valid email address'],
    required: 'Please enter an email address'
  },
  password: String,
  likedBy: [],
  likes: Number
});

UserSchema.pre('save', function(next) {
  const user = this;
  user.likes = user.likedBy.length;

  if (!user.isModified('password')) {
    return next();
  }

  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }
    bcrypt.hash(user.password, salt, null, (err, hash) => {
      if (err) {
        return next(err);
      }
      user.password = hash;
      next();
    });
  });
});

UserSchema.methods.comparePasswords = function(pass, callback) {
  bcrypt.compare(pass, this.password, (err, isMatch) => {
    if (err) {
      return next(err);
    }
    callback(null, isMatch);
  });
};

UserSchema.methods.toJSON = function() {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};
const ModelClass = mongoose.model('user', UserSchema);
module.exports = ModelClass;
