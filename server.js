const express = require('express');
const app = express();
const bodyParser = require("body-parser");
var mongoose = require('mongoose');
mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost:27017/applicants')

let Applicant = require('./app/models/applicant')
let applicant = require('./app/routes/applicant')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var port = process.env.PORT || 8080;

var router = express.Router();

app.route('/applicant')
  .post(applicant.postApplicant)
  .get(applicant.getApplicants);

app.listen(port)
console.log("You're on localhost " + port);

module.exports = app
