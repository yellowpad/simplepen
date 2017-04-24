

export default (app) => {
	app.use(function(err, req, res, next) {
		if(err.constructor.name  === 'UnauthorizedError') {
			res.status(401).send('Unauthorized');
		}
	});


	app.use('/auth', require('../auth'));
	app.use('/api/user', require('../api/user'));
}