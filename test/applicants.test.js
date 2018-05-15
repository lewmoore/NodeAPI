process.env.NODE_ENV = 'test';

let mongoose = require('mongoose');
let Applicant = require('../app/models/applicant')

let chai = require('chai')
let chaiHttp = require('chai-http')
let server = require('../server')
let should = chai.should()
let expect = chai.expect

chai.use(chaiHttp)

describe('Applicant', function(){
  beforeEach(function(done){
    Applicant.remove({}, (err) => {
      done()
    })
  })
  describe('/POST Applicant', function(){
    it('should create an applicant with name property', function(){
      let applicant = {
        firstname: 'Lewis',
        surname: 'Moore',
        previouscountry: 'UK'
      }
      chai.request(server)
      .post('/applicant')
      .send(applicant)
      .end((err, res) => {
        res.should.have.status(200)
        res.body.should.be.a('object')
        res.body.applicant.should.have.property('firstname');
        expect(res.body.applicant.firstname).to.equal('Lewis')
      })
    })

    it('doesnt create an applicant without firstname', function(){
      let applicant = {
        surname: 'Moore',
        previouscountry: 'UK'
      }
      chai.request(server)
      .post('/applicant')
      .send(applicant)
      .end((err, res) => {
        res.should.have.status(200)
        res.body.should.have.property('errors')
        res.body.errors.should.have.property('firstname')
      })
    })

    it('should create an applicant with previous country property', function(){
      let applicant = {
        firstname: 'Lewis',
        surname: 'Moore',
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
        firstname: 'Lewis',
        surname: 'Moore',
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
    it('Updates a applicant at given id', function(){
      let applicant = new Applicant({
        firstname: 'John',
        surname: 'Smith',
        previouscountry: 'UK'
      })
      applicant.save((err, applicant) => {
        chai.request(server)
        .put('/applicant/' + applicant.id)
        .send({firstname: 'Lewis', surname: 'Moore', previouscountry: 'UK'})
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.have.property('message').eql('Applicant Updated!')
          expect(res.body.applicant.firstname).to.equal('Lewis')
        })
      })
    })
  })

  describe('/DELETE/:id applicant', function(){
    it('should delete an applicant at given id', function(){
      let applicant = new Applicant({
        firstname: 'Lewis',
        surname: 'Moore',
        previouscountry: 'United Kingdom'
      })
      applicant.save((err, applicant) => {
        chai.request(server)
        .delete('/applicant/' + applicant.id)
        .end((err, res) => {
          res.should.have.status(200)
          expect(res.body.message).to.equal('Applicant Deleted!')
        })
      })
    })
  })
})
