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

describe('Account', () => {
  it('Should Login With The Right Cridentials', done => {
    app.models.Account.destroyAll({}).then(() => {
      const userInfo = {
        name: 'Ahmed Adel',
        password: '123456',
        email: 'ahmed@gmail.com',
        role: 'admin',
        description: 'A Description',
        field: 'Computer Science',
      };
      json('post', '/api/Accounts')
      .send(userInfo)
      .expect(200, (err, user) => {
        if (err) done(err);
        assert(typeof user.body === 'object');
        const loginCri = {
          email: 'ahmed@gmail.com',
          password: '123456',
        };
        json('post', '/api/Accounts/login')
        .send(loginCri)
        .expect(200, (err, res) => {
          if (err) done(err);
          assert(typeof res.body === 'object');
          assert.equal(res.body.userId, user.body.id);
          done();
        });
      });
    });
  });
});
