'use strict';

global._ = require('lodash');

const url = require('url');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const config = require('./config');
const logger = require('./logger')();
const db = require('mongoskin').db(decodeURI(url.format({
  protocol: 'mongodb',
  slashes: true,
  hostname: config.dbHost,
  port: config.dbPort,
  pathname: config.dbName,
  auth: `${config.dbUser}:${config.dbPassword}`
})));

const app = express();

app.use(express.static('public'));
app.use(bodyParser.json());

app.use('/api', require('./api')(express, db, logger, config));

app.get(/^(?!\/api).*/, (request, response) => {
  response.sendFile(path.resolve('public', 'index.html'));
});

app.listen(config.port, () => logger.info('server launched'));
