let mongooose = require('mongoose');

let Scheme = mongooose.Schema;

let landlordGardenSchema = new Scheme( {
    owner: String,
    gardenName: String,
    photo: String,
    location: String,
    address: String, 
    plantPreferences: Array,
    paymentOptions: Array,
    size: String,
    about: String,

});

module.exports = mongooose.model('landlordGarden', landlordGardenSchema);