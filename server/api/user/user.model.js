(function(){
	'use strict';

	let bcrypt = require('bcryptjs');
	let crypto = require('crypto');
	let mongoose = require('mongoose');

	let db = require('./../../db/mongo/connect')();

	//User Model
	let userSchema = new mongoose.Schema({
		email: {type: String, unique: true  },
		password: String,
		passwordResetToken: String,
		passwordResetExpires: Date,
		
		//facebook: String,
		//twitter: String,
		//google: String,
		//github: String,
		//instagram: String,
		//linkedin: String,
		//steam: String,
		//tokens: Array,

	  profile: {
	    name: String,
	    website: String,
	    picture: String
	  }
	}, { timestamps: true });

	//User Password Hashing
	userSchema.pre('save', function(next) {
		let user = this;
		if(!user.isModified('password')) {	return next();	}
		bcrypt.genSalt(10, (err, salt) => {
			if (err) {	return next(err);	}
			bcrypt.hash(user.password, salt, function(err, hash){
				if (err) {	return next(err);	}
				user.password = hash;
				next();
			});
		});
	});
	//User Password Compare
	userSchema.methods = {
		comparePassword : function(subPassword, callback){;
			bcrypt.compare(subPassword, this.password, function(err, isMatch) {
				callback(err, isMatch);
			});
		}
	};

	let User = db.model('User', userSchema);

	module.exports = User;
}());