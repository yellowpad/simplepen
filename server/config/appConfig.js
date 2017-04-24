import dotenv from 'dotenv';

dotenv.load();

const defaultExport = {
	DB_TYPE: process.env.DB_TYPE,
	ENV: process.env.NODE_ENV
};

module.exports = defaultExport;