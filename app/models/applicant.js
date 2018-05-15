var mongoose = require('mongoose');
var Schema = mongoose.Schema;

let ApplicantSchema = new Schema({
  firstname: { type: String, required: true },
  surname: { type: String, required: true },
  previouscountry: { type: String, required: true }
})

module.exports = mongoose.model('Applicant', ApplicantSchema)
