const url = require('url');
const Sequelize = require('sequelize');

module.exports = config => {
  const db = new Sequelize(decodeURI(url.format({
    protocol: 'postgres',
    slashes: true,
    hostname: config.dbHost,
    port: config.dbPort,
    pathname: config.dbName,
    auth: config.dbUser + ':' + config.dbPassword
  })), {
    operatorsAliases: false,
    logging: false
  });

  return {
    db,
    models: require('./models')(db)
  };
};
