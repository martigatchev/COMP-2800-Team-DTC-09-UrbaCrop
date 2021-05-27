let mongooose = require('mongoose');

let Scheme = mongooose.Schema;

let gardenerGardenSchema = new Scheme( {
    user: String,
    gardenName: String,
    photo: String,
    gardenType: Array,
    size: Number,
    about: String,
});

module.exports = mongooose.model('gardenerGarden', gardenerGardenSchema);