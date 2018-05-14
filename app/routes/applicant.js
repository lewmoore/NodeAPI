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

function updateApplicant(req, res) {
  Applicant.findById({_id: req.params.id}, (err, applicant) => {
    if(err) res.send(err)
    Object.assign(applicant, req.body).save((err, applicant) => {
      if (err) res.send(err)
      res.json({message: 'Applicant Updated!', applicant})
    })
  })
}

module.exports = { postApplicant, getApplicants, getApplicant, updateApplicant }
