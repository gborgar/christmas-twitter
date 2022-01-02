const mongoose = require('mongoose');
const createError = require('http-errors');
const User = require('../models/user.model');
const e = require('express');

module.exports.register = (req, res, next) => {
  res.render('auth/register')
}

module.exports.doRegister = (req, res, next) => {

  function renderWithErrors(errors) {
    console.log("errors:: ", errors);
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
        console.log("entra qui con errors:: ");
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
              req.session.userId = user.id;
              console.log(req.session);
              res.redirect('/post');
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