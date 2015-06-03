'use strict';

global._ = require('lodash');

var express = require('express');
var logger = require('./logger')();
var db = require('mongoskin').db('mongodb://***/journal');

var app = express();

app.use('/api', require('./api')(express, db));

app.listen(3000, () => logger.info('server launched'));
