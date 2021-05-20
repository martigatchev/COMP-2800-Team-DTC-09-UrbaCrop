let mongooose = require('mongoose');

let Scheme = mongooose.Schema;

let userInfoSchema = new Scheme( {
    firstName: String,
    lastName: String,
    email: String,
    username : String, 
    password : String,
    phoneNumber: Number,
    houseNumber: Number,
    postalCode: String,
    address: String,
    signupCity: String,
    view: String
});

module.exports = mongooose.model('userInfo', userInfoSchema);