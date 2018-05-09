const express = require('express');
const app = express();
const bodyParser = require("body-parser");
var mongoose = require('mongoose');
mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost:27017/applicants')

var Applicant = ('./app/models/applicant')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var port = process.env.PORT || 8080;

var router = express.Router();

app.use('/api', router)

app.listen(port)
console.log("You're on localhost " + port);
