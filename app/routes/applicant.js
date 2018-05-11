let mongoose = require('mongoose');
let Applicant = require('../models/applicant');

function postApplicant(req, res) {
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

function getApplicant(req, res) {
  Applicant.findById(req.params.id, (err, applicant) => {
    if (err) res.send(err)

    res.json(applicant)
  })
}

module.exports = { postApplicant, getApplicants, getApplicant }
