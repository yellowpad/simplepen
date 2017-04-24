import {	DB_TYPE  } from '../config/appConfig'


let dbConfig = null;

switch (DB_TYPE) {
	case("MONGO"):
		dbConfig = require('./mongo');
		break;
	case("POSTGRESS"):
		dbConfig = require('./postgres');
	case("NONE"):
		dbConfig = require('./none');
	default:
		throw new Error(`Database type ${DB_TYPE} not found`);

}

export const connect = dbConfig.connect;
//export const controllers = dbConfig.controllers;
//export const passport = dbConfig.passport;
export const session = dbConfig.session;

export default dbConfig.default;