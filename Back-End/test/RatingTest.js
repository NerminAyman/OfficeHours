const request = require('supertest');
const assert = require('assert');
const app = require('../server/server');

function json(verb, url) {
  return request(app)[verb](url)
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json')
    .set('Status', 'test')
    .expect('Content-Type', /json/);
}

describe('Comment', () => {
  it('Should Create A comment With correct UserID', done => {
      const comment = {
        message: 'Romy is Pretty',
        Rating: 5,
        Report: '0',
        userID: '5ac699adde74c8971d0f74b9'
      };
      json('post', '/api/Comments').send(comment).expect(200, (err, user) => {
        if (err) done(err);
        assert(typeof user.body === 'object');
        done();

      });
  });
});

describe('Report', () => {
  it('Should Create A Report With correct UserID', done => {
    const comment = {
      message: 'Romy Annoyed me ',
      Rating: 1,
      Report: '1',
      userID: '5ac699adde74c8971d0f74b9'
    };
    json('post', '/api/Comments').send(comment).expect(200, (err, user) => {
      if (err) done(err);
      assert(typeof user.body === 'object');
      done();

    });
  });
});
