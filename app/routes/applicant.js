let mongoose = require('mongoose');
let Applicant = require('../models/applicant');

function postApplicant(req, res) {
  console.log("POST FUNCTION")
  console.log(req.body)
  var newApplicant = new Applicant(req.body);
  newApplicant.save((err, applicant) => {
    if(err) {
      res.send(err)
    }
    res.json({ message: 'Applicant added', applicant })
  })
}

function getApplicants(req, res) {
  let query = Applicant.find({})
  query.exec((err, applicants) => {
    if (err) res.send(err);
    res.json(applicants)
  })
}

module.exports = { postApplicant, getApplicants }
