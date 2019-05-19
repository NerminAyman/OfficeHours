'use strict';

const adminData = {
  name: 'RiseUp Admin',
  email: 'admin@riseup.com',
  password: 'admin@RiseUp1234',
  role: 'admin',
  description: 'RiseUp Seeded Admin',
  field: 'Adminstration',
};

module.exports = function run(server) {
  let Account = server.models.Account;
  Account.findOne({where: {email: 'admin@riseup.com'}}, function(err, admin) {
    if (admin) {
      console.log('Admin are already seeded.');
    } else {
      Account.create(adminData, function(err, data) {
        if (err) console.log(err);
        else console.log('Admin Data Seeded.');
      });
    }
  });
};
