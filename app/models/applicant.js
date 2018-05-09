var mongoose = require('mongoose');
var Schema = mongoose.Schema;

let ApplicantSchema = new Schema({
  name: String
})

module.exports = mongoose.model('Applicant', ApplicantSchema)
