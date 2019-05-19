'use strict';

const adminSeeder = require('./Seeder/AdminSeeder');

module.exports = function seeder(server) {
  adminSeeder(server);
};
