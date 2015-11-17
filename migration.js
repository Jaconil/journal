'use strict';

global._ = require('lodash');

var async = require('async');
var url = require('url');
var fs = require('fs');
var config = require('./server/config');
var db = require('mongoskin').db(decodeURI(url.format({
  protocol: 'mongodb',
  slashes: true,
  hostname: config.dbHost,
  port: config.dbPort,
  pathname: config.dbName,
  auth: config.dbUser + ':' + config.dbPassword
})));

var years = ['2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015'];

async.eachSeries(years, function(year, nextYear) {

  console.log('--- Year ' + year + ' ---');

  var content = fs.readFileSync(process.argv[2] + year + '.txt', {encoding: 'utf8'});
  var days = content.split("\n");
  var imported = -1;
  var dbDays = db.collection('day');

  async.eachSeries(days, function(day, nextDay) {
    var date = day.substr(0, 8).split('/');
    var formatedDate = '20' + date[2] + '-' + date[1] + '-' + date[0];

    var formatedDay = {
      date: formatedDate,
      content: day.substr(11),
      status: 'written'
    };

    imported++;

    dbDays.updateOne({date: formatedDate}, formatedDay, {upsert: true}, nextDay);
  }, function(err) {
    if (err) {
      console.log(err);
    }

    console.log('Imported days: ' + imported);
    nextYear();
  });

}, function(err) {
  if (err) {
    console.log(err);
  }

  console.log('Import finished');
});
