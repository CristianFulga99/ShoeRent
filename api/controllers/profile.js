const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports.profileRead = (req, res) => {
  if (!req.payload._id) {
    res.status(401).json({
      message: 'UnauthorizedError: private profile'
    });
  } else {
    // Otherwise continue
    User.findById(req.payload._id).exec(function(err, user) {
      res.status(200).json(user);
    });
  }
};

module.exports.profileUpdate = (req, res) => {
  // If no user ID exists in the JWT return a 401
  if (!req.payload._id) {
    res.status(401).json({
      message: 'UnauthorizedError: private profile'
    });
  } else {
    // Otherwise continue
    User.findByIdAndUpdate(req.payload._id, {
      $set: {
        planId: req.body.planId,
        shoeId: req.body.shoeId 
      }
    },{
      new: true 
    }).exec(function(err, updatedUser) {
      res.status(200).json(updatedUser);
    });
  }
};

module.exports.profileDelete = (req, res) => {
  // If no user ID exists in the JWT return a 401
  if (!req.payload._id) {
    res.status(401).json({
      message: 'UnauthorizedError: private profile'
    });
  } else {
    // Otherwise continue
    User.findByIdAndRemove(req.payload._id).exec(function(err, deleteUser) {
      res.status(200).json(deleteUser);
    });
  }
};