(function() {
	'use strict';

	var express = require('express'),
			authService = require('./auth.service'),
			//providers = require('./auth.providers'),
			router = express.Router();

	module.exports = router;

	router
		.post('/login', authService.login)
		.post('/signup', authService.signup)
}());