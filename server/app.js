'use strict';

global._ = require('lodash');

var url = require('url');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');

var config = require('./config');
var logger = require('./logger')();
var db = require('mongoskin').db(decodeURI(url.format({
  protocol: 'mongodb',
  slashes: true,
  hostname: config.dbHost,
  port: config.dbPort,
  pathname: config.dbName,
  auth: config.dbUser + ':' + config.dbPassword
})));

var app = express();

app.use(express.static('public'));
app.use(bodyParser.json());

app.use('/api', require('./api')(express, db, logger, config));

app.get('*', function (request, response){
  response.sendFile(path.resolve('public', 'index.html'));
});

app.listen(config.port, () => logger.info('server launched'));
