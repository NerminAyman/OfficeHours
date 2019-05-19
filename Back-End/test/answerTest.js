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

describe('Answers', () => {
  it('Should create an answer with the right parameters', done => {
    app.models.Account.destroyAll({}).then(() => {
      const Answer = {
        description: 'This is an answer to test',
        questionID: '5ade2a82f94f6206bd8d3750'

      };
      json('post', '/api/answers')
        .send(Answer)
        .expect(200, (err, Answer) => {
          if (err) done(err);
          assert(typeof Answer.body === 'object');
            done();

        });
    });
  });
});

describe('Answers', () => {
    it('Should not create an answer', done => {
      app.models.Account.destroyAll({}).then(() => {
        const Answer = {
          questionID: '5ade2a82f94f6206bd8d3750'
  
        };
        json('post', '/api/answers')
          .send(Answer)
          .expect(422, (err, Answer) => {
            if (err) done(err);
            assert(typeof Answer.body === 'object');
              done();
  
          });
      });
    });
  });

describe('Questions', () => {
  it('Should Get Questions', done => {
    app.models.Account.destroyAll({}).then(() => {
      json('get', '/api/questions')
        .send()
        .expect(200, (err, Questions) => {
          if (err) done(err);
          assert(typeof Questions.body === 'object');
            done();
        });
    });
  });
});

