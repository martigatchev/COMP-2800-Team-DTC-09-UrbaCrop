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
    city: String,
    view: String,
    imgURL: String,
    rating: Number,
    numOfProjects: Number
});

module.exports = mongooose.model('userInfo', userInfoSchema);