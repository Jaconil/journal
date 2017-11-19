module.exports = state => {
  return {

    /**
     * Inserts fake fays
     *
     * @param {string} days - Array of days {date, status, content}
     * @returns {Promise} Resolves if successful
     */
    insert: days => {
      return state.db.queryInterface.bulkInsert('Day', _.map(days, ({ date, status, content }) => {
        return { date, content, statusId: status === 'draft' ? 1 : 2 };
      }));
    },

    /**
     * Delete all days
     *
     * @returns {Promise} Resolves if successful
     */
    delete: () => {
      return state.db.queryInterface.bulkDelete('Day');
    }
  };
};
