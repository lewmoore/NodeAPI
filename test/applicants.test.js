
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
        name: 'Lewis Moore',
        previouscountry: 'UK'
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
  })

  describe('GET all applicants', function(){
    it('should retrieve all applicants', function(){
      chai.request(server)
      .get('/applicant')
      .end((err, res) => {
        res.should.have.status(200)
        res.body.should.be.a('array')
      })
    })
  })

  describe('/GET/:id applicant', function(){
    it('should get an applicant by the given id', function(){
      let applicant = new Applicant({
        name: 'John Smith',
        previouscountry: 'UK'
      });
      applicant.save((err, applicant) => {
        chai.request(server)
        .get('/applicant/' + applicant.id)
        .send(applicant)
        .end((err, res) => {
          res.should.have.status(200)
          expect(res.body._id).to.equal(applicant.id)
        })
      })
    })
  })

  describe('/PUT/:id applicant', function(){
    it('Updates a book at given id', function(){
      let applicant = new Applicant({
        name: 'Lewis',
        previouscountry: 'UK'
      })
      applicant.save((err, applicant) => {
        chai.request(server)
        .put('/applicant/' + applicant.id)
        .send({name: 'Lewis Moore', previouscountry: 'UK'})
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.have.property('message').eql('Applicant Updated!')
          expect(res.body.applicant.name).to.equal('Lewis Moore')
        })
      })
    })
  })

  describe('/DELETE/:id applicant', function(){
    it('should delete an applicant at given id', function(){
      let applicant = new Applicant({
        name: 'Lewis Moore',
        previouscountry: 'United Kingdom'
      })
      applicant.save((err, applicant) => {
        chai.request(server)
        console.log(applicant)
        .delete('/applicant/' + applicant.id)
        .end((err, res) => {
          res.should.have.status(200)
          expect(res.body.message).to.equal('Applicant Deleted!')
        })
      })
    })
  })
})
