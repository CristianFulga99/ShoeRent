const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  planId: String,
  shoeId: Number,
  age: String,
  gender: String,
  country: String,
  hash: String,
  salt: String
});

userSchema.methods.setPassword = function(password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, 'sha512')
    .toString('hex');
};

userSchema.methods.validPassword = function(password) {
  const hash = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, 'sha512')
    .toString('hex');
  return this.hash === hash;
};  

userSchema.methods.generateJwt = function() {
  const expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);

  return jwt.sign(
    {
      _id: this._id,
      username: this.username,
      email: this.email,
      planId: this.planId,
      shoeId: this.shoeId,
      age: this.age,
      gender: this.gender,
      country: this.country,
      exp: parseInt(expiry.getTime() / 1000)
    },
    'MY_SECRET'
  ); // DO NOT KEEP YOUR SECRET IN THE CODE!
};

mongoose.model('User', userSchema, 'users');