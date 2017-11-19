module.exports = (state) => {
  return {
    database: {
      days: require('./days')(state),
      users: require('./users')(state)
    }
  };
};
