'use strict';

var TABLE_NAME = 'ninjaSchoolData';

/** LOCAL SETUP
var localUrl = 'http://localhost:9999';
var localCredentials = {
  region: 'us-east-1',
  accessKeyId: 'fake',
  secretAccessKey: 'fake'
};
var localDynasty = require('dynasty')(localCredentials, localUrl);
var dynasty = localDynasty;
**/

var dynasty = require('dynasty')({});

function DatabaseHelper() {
}

var table = function() {
  return dynasty.table(TABLE_NAME);
};

DatabaseHelper.prototype.createTable = function() {
  return dynasty.describe(TABLE_NAME)
    .catch(function(error) {
      console.log('createTable: describe:', error);
      return dynasty.create(TABLE_NAME, {
        key_schema: {
          hash: ['userId', 'string'],
          range: ['name', 'string']
        }
      });
    });
};

DatabaseHelper.prototype.storeData = function(userId, name, data) {
  console.log('writing data to database for user', userId, name);
  return table().insert({
    userId: userId,
    name: name,
    data: data
  }).catch(function(error) {
    console.log(error);
  });
};

DatabaseHelper.prototype.readData = function(userId, name) {
  console.log('reading data with user id of ', userId, name);
  return table().find({ hash: userId, range: name })
    .then(function(result) {
      console.log('databasehelper readData then', result);
      return result;
    })
    .catch(function(error) {
      console.log('databasehelper readData error', error);
    });
};

module.exports = DatabaseHelper;