import express from 'express';
import session from 'express-session';
import flash from 'express-flash';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
//import {	session as dbSession	} from '../db';
//import unsupportedMessage from '../db/unsupportedMessage';
import  {	DB_TYPE, ENV  } from './appConfig';
import gzip from 'compression';
import helmet from 'helmet';
import cors from 'cors';
import path from 'path';
import {  sessionSecret  } from './secret';
import chalk from 'chalk';



export default (app) => {

	app.set('port', (process.env.PORT));
	var ENV = process.env.NODE_ENV;
	if (ENV === 'production'){
		app.use(gzip());
		//secure HTTP headers -- helmet
		app.use(helmet());
	}

	app.use(bodyParser.urlencoded({	extended :true }));
	app.use(bodyParser.json({	limit: '100mb'	}));
	app.use(cors());
	app.use(methodOverride());

	app.use(express.static(path.join(__dirname, '../..', 'public')));

	//...There...Goes...My...Heroku!
	//app.use('trust proxy', 'loopback');
	//
	//
	/*
	//db store
	let sessionStore = null;
	if(!dbSession){
		console.warn(unsupportedMessage('session'));
	} else{
		sessionStore = dbSession();
	}*/

	const sess = {
		resave: false,
		saveUninitialized: false,
		secret: sessionSecret,
		proxy: true,
		name: 'sessionId',
		cooke: {
			httpOnly: true,
			secure: false
		},
		//store: sessionStore
	};

	console.log(chalk.green('================================='));
	console.log(chalk.green('=====>Starting Server============'));
	console.log(chalk.green(`=====>Environment: ${ENV}===`));
	console.log(chalk.green('=====>') + chalk.blue(`Using Port: ${app.get('port')}`) + chalk.green('==========='));
	console.log(chalk.green('=====>') + chalk.yellow(`Using DB: ${DB_TYPE}`) + chalk.green('============'));
	console.log('*********************************');
	app.use(session(sess));

	app.use(flash());

}
