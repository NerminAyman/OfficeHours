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
  it('Should Create Register With Right Inputs', done => {
    app.models.Account.destroyAll({}).then(() => {
      const userInfo = {
        name: 'Romy Zakaria',
        password: '123456',
        email: 'Romy@gmail.com',
        role: 'admin',
        description: 'A Description',
        field: 'Computer Science',
      };
      json('post', '/api/Accounts')
        .send(userInfo)
        .expect(200, (err, user) => {
          if (err) done(err);
          assert(typeof user.body === 'object');
            done();
          
        });
    });
  });
});
