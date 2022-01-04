const mongoose = require('mongoose');
const User = require('../models/user.model');

module.exports.register = (req, res, next) => {
  res.render('auth/register')
}

module.exports.doRegister = (req, res, next) => {

  function renderWithErrors(errors) {
    res.render('auth/register', {
      errors: errors,
      user: req.body
    })
  }

  User.findOne({ username: req.body.username })
    .then(user => {
      if (!user) {
        return User.create(req.body)
        .then(user => res.redirect('/login'))
      } else {
        renderWithErrors({ username: 'username already exists' });
      }
    })
    .catch(error => {
      if (error instanceof mongoose.Error.ValidationError) {
        renderWithErrors(error.errors);
      } else {
        next(error);
      } 
    })
}

module.exports.login = (req, res, next) => {
  res.render('auth/login');
}

module.exports.doLogin = (req, res, next) => {

  function renderWithErrors() {
    res.render('auth/login', {
      user: req.body,
      errors: { password: 'username or password incorrect' }
    })
  }

  const { username, password } = req.body;
  User.findOne({ username })
    .then(user => {
      if (!user) {
        renderWithErrors();
      } else {
        return user.checkPassword(password)
          .then(match => {
            if (!match) {
              renderWithErrors();
            } else {
              console.log("psasa por aqui");
              req.session.userId = user.id;
              res.redirect('/posts');
            }
          })
      } 
    })
    .catch(error => next(error));
}

module.exports.logout = (req, res, next) => {
  req.session.destroy();
  res.redirect('/login');
}
