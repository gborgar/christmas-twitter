const mongoose = require('mongoose');
const User = require('../models/user.model');

module.exports.profile = (req, res, next) => {
    User.findById(req.session.userId)
    .then((user) => { console.log(user); return res.render("profile/profile", { user }) })
    .catch((error) => next(error));
  }