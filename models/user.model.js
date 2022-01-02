const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

const PASSWORD_PATTERN = /.{8,}/;
const SALT_WORK_FACTOR = 10;

const userSchema = new Schema({
  username: {
    type: String,
    require: [true, 'name is required'],
    minlength: [4, 'Title needs at least 3 chars']
  },
  password: {
    type: String,
    require: [true, 'password is required'],
    match: [PASSWORD_PATTERN, 'password needs at least 8 chars']
  },
  avatarUrl: {
    type: String

  },
  bio: {
    type: String
  }
}, { timestamps: true });

userSchema.pre('save', function(next) {
  const user = this;

  if (user.isModified('password')) {
    bcrypt.hash(user.password, SALT_WORK_FACTOR)
      .then(hash => {
        user.password = hash;
        next();
      })
      .catch(error => next(error));
  } else {
    next();
  }
})

userSchema.methods.checkPassword = function (passwordToCheck) {
  return bcrypt.compare(passwordToCheck, this.password);
}

const User = mongoose.model('User', userSchema);
module.exports = User;