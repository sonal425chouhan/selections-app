const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Selection} = require('./../models/selection');

const selection = [{
  _id: new ObjectID(),
  firstName: 'First test'
  LastName: 'First test'
  email: 'email1@ab.co'
}, {
  _id: new ObjectID(),
  firstName: 'First test'
  LastName: 'First test'
  email: 'email1@ab.co'
}];

beforeEach((done) => {
  Selection.remove({}).then(() => {
    return Selection.insertMany(selection);
  }).then(() => done());
});

describe('POST /selection', () => {
  it('should create a new selection', (done) => {
    var selection = {  firstName: 'First test'
      LastName: 'First test'
      email: 'email1@ab.co'
    };

    request(app)
      .post('/selection')
      .send({selection})
      .expect(200)
      .expect((res) => {
        expect(res.body.data).toBe(selection);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Selection.find({selection}).then((selections) => {
          expect(selections.length).toBe(1);
          expect(selections[0].selection).toBe(selection);
          done();
        }).catch((e) => done(e));
      });
  });

  it('should not create selection with invalid body data', (done) => {
    request(app)
      .post('/selection')
      .send({})
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Selection.find().then((selection) => {
          expect(selection.length).toBe(2);
          done();
        }).catch((e) => done(e));
      });
  });
});

describe('GET /selection', () => {
  it('should get all selection', (done) => {
    request(app)
      .get('/selection')
      .expect(200)
      .expect((res) => {
        expect(res.body.data.length).toBe(2);
      })
      .end(done);
  });
});


