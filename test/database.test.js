const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const chai = require('chai');
const expect = chai.expect;
const testSchema = new Schema({
  name: { type: String, required: true }
});
const ApplicantTest = mongoose.model('ApplicantTest', testSchema);
describe('Database Tests', function() {
  before(function (done) {
    mongoose.connect('mongodb://localhost:27017/testDatabase');
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error'));
    db.once('open', function() {
      console.log('We are connected to test database!');
      done();
    });
  });
  describe('Test Database', function() {
    it('New name saved to test database', function(done) {
      var testName = ApplicantTest({
        name: 'Lewis'
      });

      testName.save(done);
    });
    it('Dont save incorrect format to database', function(done) {
      var wrongSave = ApplicantTest({
        notName: 'Not Lewis'
      });
      wrongSave.save(err => {
        if(err) { return done(); }
        throw new Error('Should generate error!');
      });
    });
    it('Should retrieve data from test database', function(done) {
      ApplicantTest.find({name: 'Lewis'}, (err, name) => {
        if(err) {throw err;}
        if(name.length === 0) {throw new Error('No data!');}
        done();
      });
    });
  });
  after(function(done){
    mongoose.connection.db.dropDatabase(function(){
      mongoose.connection.close(done);
    });
  });
});
