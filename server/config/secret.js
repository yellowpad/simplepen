import dotenv from 'dotenv';

dotenv.load();

export const sessionSecret = process.env.SESSION_SECRET;

export default {
	sessionSecret
};