let mongoose = require('mongoose');

let Scheme = mongoose.Schema;

let userSchema = new Scheme( {
  username: String,
  password: String,
});

module.exports = mongoose.model('users', userSchema);