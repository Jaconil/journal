const crypto = require('crypto');

module.exports = (state) => {
  return {
    /**
     * Inserts a fake user
     *
     * @param {string} username - User login
     * @param {string} password - User password
     */
    insert: (username, password) => {
      return state.db.queryInterface
        .bulkInsert('User', [{
          username,
          password: crypto
            .createHash('sha256')
            .update(state.config.passwordSalt + password + state.config.passwordSalt)
            .digest('hex')
        }]);
    },

    /**
     * Delete all users
     */
    delete: () => {
      return state.db.queryInterface.bulkDelete('User');
    }
  };
};
