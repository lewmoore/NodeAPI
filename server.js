const express = require('express');
const app = express();
const bodyParser = require("body-parser");
var mongoose = require('mongoose');
let config = ('config')

mongoose.Promise = global.Promise

if (process.env.NODE_ENV === 'test') {
  mongoose.connect("mongodb://localhost:27017/applicantsTest")
} else {
  mongoose.connect("mongodb://localhost:27017/applicants")
}

let Applicant = require('./app/models/applicant')
let applicant = require('./app/routes/applicant')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var port = process.env.PORT || 8080;

var router = express.Router();

app.route('/applicant')
  .post(applicant.postApplicant)
  .get(applicant.getApplicants);

app.route('/applicant/:id')
  .get(applicant.getApplicantById)
  .put(applicant.updateApplicant)
  .delete(applicant.deleteApplicant)

app.route('/applicant/name/:firstname')
  .get(applicant.getApplicantByFirstname)

app.listen(port)
console.log("You're on localhost " + port + " and database " + process.env.NODE_ENV);

module.exports = app
