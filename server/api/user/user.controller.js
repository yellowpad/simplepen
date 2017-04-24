let express = require('express');
let authService = require('../../auth/auth.service');
let User = require('./user.model');
let chalk = require('chalk');
let Promise = require('bluebird');

let userController = {
	me:me,
	editUserProfile:editUserProfile
};



function me(req, res) {
	if(!req.user){
		console.log(chalk.red('No User Provided.'));
		return res.status(401).send({
			message: 'No user provided'
		});
	
	}User
		.findById(req.user)
		.then((user) => {
			if(!user){
				console.log(chalk.red('No User Found.'));
				return res.status(404).send({message:'No user found'});
			}
			let currentUser = {
				email: user.email,
				profile: user.profile,
			};
			return currentUser;
		})
		.then((user) => {
			return res.status(200).send({
				user:user
			});
		})
		.catch((err) => {
			console.log('ERROR: ', err);
			return res.status(500).send({message:err});
		});
}

function editUserProfile(req, res){
	if(!req.body.userId){
		console.log(chalk.red('No User Present'));
		return res.status(404).send({message: 'No User Present'});
	}
	User.findById(req.body.userId)
		.then((user)=>{
			if(user){
				switch (req.body.info){
					
					case 'profile':
						if(user.profile.name !== req.body.name){
							user.profile.name = req.body.name;
						}
						if(user.profile.picture !== req.body.picture){
							user.picture = req.body.picture;
						}
						if(user.profile.website !== req.body.website){
							user.profile.website = req.body.website;
						}
						user.save()
							.then((user)=>{
								let currentUser = {
									email: user.email,
									profile: user.profile,
								};
								return res.status(200).send({
								});
							})
							.catch((err)=>{
								console.log('ERROR: ', err);
								return res.status(500).send({message:err});
							});
						break;

					case 'email':
						user.comparePassword(req.body.pass, function(err, isMatch){
							if(err){
								console.log('ERROR: ', err);
								return res.status(500).send({message:err});
							}
							if(!isMatch){
								return res.status(401).send({message:'Incorrect Password'});
							}
							else{
								if(user.email !== req.body.email){
									user.email = req.body.email;
								}
							user.save()
								.then((user)=>{
									let currentUser = {
										email: user.email,
										profile: user.profile
									};
									return res.status(200).send({
										user:currentUser,
									});
								})
								.catch((err)=>{
									console.log('ERROR: ', err);
									return res.status(500).send({message:err});
								});
							}
						});

						break;


					case 'password':
						user.comparePassword(req.body.pass, function(err, isMatch){
							if(err){
								console.log('ERROR: ', err);
								return res.status(500).send({message:err});
							}
							if(!isMatch){
								return res.status(401).send({message:'Incorrect Password'});
							}
							else{
								user.password = req.body.passNew;
								}
							user.save()
								.then(()=>{									
									return res.status(200).end();
								})
								.catch((err)=>{
									console.log('ERROR: ', err);
									return res.status(500).send({message:err});
								});
						});

						break;

					default:
						break;
				}
			}
		})

}


module.exports = userController;
	