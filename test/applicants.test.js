
let mongoose = require('mongoose');
let Applicant = require('../app/models/applicant')

let chai = require('chai')
let chaiHttp = require('chai-http')
let server = require('../server')
let should = chai.should()

chai.use(chaiHttp)

describe('Applicant', function(){
  describe('/POST Applicant', function(){
    it('should create an applicant', function(){
      let applicant = {
        name: 'Lewis Moore'
      }
      chai.request(server)
      .post('/applicant')
      .send(applicant)
      .end((err, res) => {
        res.body.should.be.a('object')
        res.body.should.have.property('name');
        expect(res.body.name).toEqual('Lewis')
      })
    })
  })
})
