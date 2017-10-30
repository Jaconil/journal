'use strict';

const crypto = require('crypto');
const passwordSalt = process.env.PASSWORD_SALT;

module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert('User', [{
      username: 'Jaconil',
      password: crypto
        .createHash('sha256')
        .update(passwordSalt + 'azerty' + passwordSalt)
        .digest('hex')
    }], {});
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete('User');
  }
};
