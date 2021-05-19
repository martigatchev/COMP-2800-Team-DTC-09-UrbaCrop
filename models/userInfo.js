let mongooose = require('mongoose');

let Scheme = mongooose.Schema;

let userInfoSchema = new Scheme( {
    username : String, 
    password : String,
});

module.exports = mongooose.model('userInfo', userInfoSchema);