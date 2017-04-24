var fs = require('fs');
var path = require('path');
var mongoose = require('mongoose');
var db = require('./constants').db;
var cachedConnections = {};

function connect() {
	if (!cachedConnections[db]){
		mongoose.set('debug', false);
		var options = {	promiseLibrary: require('bluebird'), autoIndex: false  };
		
		cachedConnections[db] = mongoose.createConnection(db, options);
		cachedConnections[db].on('error', console.error);
		cachedConnections[db].on('disconnected', connect);
		cachedConnections[db].on('connected', function() {
			console.log(`=====> Connected to ${db}`);
		});
	}
	return cachedConnections[db];
}

module.exports = connect;