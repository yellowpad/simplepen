export const db = (process.env.MONGODB || ('mongodb://localhost/' + process.env.MONGODBURI));

export default {
	db
};