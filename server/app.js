'use strict';

global._ = require('lodash');

var url = require('url');
var config = require('./config');
var express = require('express');
var logger = require('./logger')();
var db = require('mongoskin').db(unescape(url.format({
  protocol: 'mongodb',
  slashes: true,
  hostname: config.dbHost,
  port: config.dbPort,
  pathname: config.dbName,
  auth: config.dbUser + ':' + config.dbPassword
})));

var app = express();

app.use(express.static('public'));
app.use('/api', require('./api')(express, db, logger, config));

app.listen(config.port, () => logger.info('server launched'));
