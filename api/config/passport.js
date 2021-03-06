const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = mongoose.model('User');

passport.use(
  new LocalStrategy(
    {
      usernameField: 'username'
    },
      function(username, password, done) {
        User.findOne({ username: username }, function(err, user) {
          if (err) {
            return done(err);
          }
          // Return if user not found in database
          if (!user) {
            return done(null, false, {
              message: 'User not Found'
            });
          }
          // Return if password is wrong
          if (!user.validPassword(password)) {
            return done(null, false, {
              message: 'Wrong Password'
            });
          }
          // If credentials are correct, return the user object
          return done(null, user);
        });
      }
    )
  );