
let mongoose = require('mongoose');
let Applicant = require('../app/models/applicant')

let chai = require('chai')
let chaiHttp = require('chai-http')
let server = require('../server')
let should = chai.should()
let expect = chai.expect

chai.use(chaiHttp)

describe('Applicant', function(){
  describe('/POST Applicant', function(){
    it('should create an applicant with name property', function(){
      let applicant = {
        name: 'Lewis Moore'
      }
      chai.request(server)
      .post('/applicant')
      .send(applicant)
      .end((err, res) => {
        res.should.have.status(200)
        res.body.should.be.a('object')
        res.body.applicant.should.have.property('name');
        expect(res.body.applicant.name).to.equal('Lewis Moore')
      })
    })

    it('should create an applicant with previous country property', function(){
      let applicant = {
        name: 'Lewis Moore',
        previouscountry: 'UK'
      }
      chai.request(server)
      .post('/applicant')
      .send(applicant)
      .end((err, res) => {
        res.should.have.status(200)
        res.body.applicant.should.have.property('previouscountry')
        expect(res.body.applicant.previouscountry).to.equal('UK')
      })
    })

    it('should retrieve all applicants', function(){
      chai.request(server)
      .get('/applicant')
      .end((err, res) => {
        res.should.have.status(200)
        res.body.should.be.a('array')
      })
    })
  })
})
