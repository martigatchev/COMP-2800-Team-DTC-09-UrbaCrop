let mongooose = require('mongoose');

let Scheme = mongooose.Schema;

let applicationInfoSchema = new Scheme( {
    applicantUsername: String,
    applicantComment: String,
    gardenName: String,
    ownerUsername: String
});

module.exports = mongooose.model('applicationInfo', applicationInfoSchema);