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

describe('Tags', () => {
  it('Should Create a Tag With Right Input', done => {
    app.models.Account.destroyAll({}).then(() => {
      const Tag = {
        name: 'Software Engineering',
      };
      json('post', '/api/Tags')
        .send(Tag)
        .expect(200, (err, Tags) => {
          if (err) done(err);
          assert(typeof Tags.body === 'object');
            done();

        });
    });
  });
});

describe('Tags', () => {
  it('Should Get Tags', done => {
    app.models.Account.destroyAll({}).then(() => {
      json('get', '/api/Tags')
        .send()
        .expect(200, (err, Tags) => {
          if (err) done(err);
          assert(typeof Tags.body === 'object');
            done();
        });
    });
  });
});

describe('Cards', () => {
  it('Should Create Card With Right Inputs', done => {
    app.models.Account.destroyAll({}).then(() => {
      const cardInfo = {
        accountID: 'admin',
        type: 'ExpertApproval',
        name: 'Romy Zakaria',
        password: '123456',
        email: 'Romy@gmail.com',
        description: 'A Description',
        field: 'Computer Science',
        tags: [
      {
        "name": "samy",
        "id": "5ac699a0de74c8971d0f74b8"
      },
      {
        "name": "aojsgn",
        "id": "5ac69982de74c8971d0f74b5"
      },
      {
        "name": "bashaaa",
        "id": "5ac69935de74c8971d0f74b3"
      },
      {
        "name": "hammamamamama",
        "id": "5ac699adde74c8971d0f74b9"
      },
      {
        "name": "hamdama",
        "id": "5ac69994de74c8971d0f74b6"
      },
    ]
      };
      json('post', '/api/Cards')
        .send(cardInfo)
        .expect(200, (err, card) => {
          if (err) done(err);
          assert(typeof card.body === 'object');
            done();

        });
    });
  });
});
