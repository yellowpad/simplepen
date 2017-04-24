(function() {
	'use strict';

	var errorHandler = require('../errors');
	var mongoose = require('mongoose');
	var User = require('../api/user/user.model');
	var jwt = require('jwt-simple');
	var moment = require('moment');
	var secret = require('./authSecret');
	var TOKEN_SECRET = secret.TOKEN_SECRET;
	var TOKEN_VERSION = secret.TOKEN_VERSION;

	exports.getPayload					= getPayload;
	exports.ensureAuthenticated	= ensureAuthenticated;
	exports.createToken					= createToken;
	exports.login								= login;
	exports.logout							= logout;
	exports.signup							= signup;

	function getPayload(req) {
		var token = req.headers.authorization.split(' ')[1];
		var payload = jwt.decode(token, TOKEN_SECRET);
		return payload;
	}

	function ensureAuthenticated(req, res, next) {
		if(!req.headers.authorization) {
			return res.status(401).send({
				message: 'No authorization headers present'
			});
		}
		var payload = getPayload(req);
		if (payload.exp <= Date.now()) {
			return res.status(401).send({
				message: 'Token has expired'
			});
		}
		req.user = payload.sub;
		next();
	}

	function createToken(req, user) {
		var payload = {
			v: TOKEN_VERSION,
			iss: req.hostname,
			d: {
				uid: user._id,
			},
			sub: user._id,
			iat: moment().valueOf(),
			exp: moment().add(14, 'days').valueOf()
		};
		return jwt.encode(payload, TOKEN_SECRET);
	}

	function login(req, res) {
		console.log("Login Requested: ", req.body.email);
		User.findOne({ email: req.body.email })
			.exec(function(err, user){
				if(err){
					console.log(err);
					return res.status(500).send({ message: 'Error locating user.' });
				}
				if(!user){ return res.status(200).send({ attempt: true, message: 'Wrong email and/or password.' }); }
				user.comparePassword(req.body.password, function(err, isMatch) {
					if(err){
						console.log(err);
						return res.status(500).send({ message: 'Error logging in' });
					}
					if(!isMatch){ return res.status(200).send({ attempt: true, message: 'Wrong email and/or password.' }); }
					let thisUser = {
						email: user.email,
						profile: user.profile,

					};
					return res.status(200).send({ attempt: false, token: createToken(req, user), thisUser: user });
				});
			});
	}

	function logout(req, res) {
		req.headers.authorization = undefined;
		res.end();
	}

	function signup(req, res) {
		var data = req.body;
		var user = new User();
		user.email = (data.email).toLowerCase();
		user.password = data.password;
		user.profile.name = data.name;
		user.save()
			.then((savedUser) => {
				let user = {
					email: savedUser.email,
					profile: savedUser.profile,
				};
				return res.status(200).send({user: user});
			})
			.catch((err)=>{
				console.log(err);
				return res.status(409).send({message: err});
			});
	}

}());