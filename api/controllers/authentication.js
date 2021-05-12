const mongoose = require('mongoose');
const passport = require('passport');
const User = mongoose.model('User');

//Register method
module.exports.register = (req, res) => {
  const user = new User();

  user.username = req.body.username;
  user.email = req.body.email;
  user.planId = " ";
  user.shoeId = 0;
  user.age = req.body.age;
  user.gender = req.body.gender;
  user.country = req.body.country;

  user.setPassword(req.body.password);

  user.save(() => {
    const token = user.generateJwt();
    res.status(200);
    res.json({
      token: token
    });
  });
};

//Login Method
module.exports.login = (req, res) => {
  passport.authenticate('local', (err, user, info) => {
    // If Passport throws/catches an error
    if (err) {
      res.status(404).json(err);
      return;
    }
    // If a user is found
    if (user) {
      const token = user.generateJwt();
      res.status(200);
      res.json({
        token: token
      });
    } else {
      // If user is not found
      res.status(401).json(info);
    }
  })(req, res);
};
