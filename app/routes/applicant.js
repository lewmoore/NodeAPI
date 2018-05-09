let mongoose = require('mongoose');
let Applicant = require('../models/applicant');

function postApplicant(req, res) {
  var newApplicant = new Applicant(req.body);

  newapplicant.save((err, applicant) => {
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

module.exports = { postApplicant, getApplicants }
