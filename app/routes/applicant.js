let mongoose = require('mongoose');
let Applicant = require('../models/applicant');

function postApplicant(req, res) {
  var newApplicant = new Applicant(req.body);
  newApplicant.save((err, applicant) => {
    if(err) {
      res.send(err)
    } else {
      res.json({ message: 'Applicant added', applicant })
    }
  })
}

function getApplicants(req, res) {
  let query = Applicant.find({})
  query.exec((err, applicants) => {
    if (err) res.send(err);
    res.json(applicants)
  })
}

function getApplicantById(req, res) {
  Applicant.findById(req.params.id, (err, applicant) => {
    if (err) res.send(err)

    res.json(applicant)
  })
}

function getApplicantByFirstname(req, res) {
  Applicant.find({ firstname: req.params.firstname}, (err, applicant) => {
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

function deleteApplicant(req, res) {
  Applicant.remove({_id: req.params.id}, (err, result) => {
    res.json({ message: 'Applicant Deleted!', result})
  })
}

module.exports = { postApplicant, getApplicants, getApplicantById, getApplicantByFirstname, updateApplicant, deleteApplicant }
