const errorHandler = {
	error: error,
	reject: onReject,
	validationError: validationError
};

function error(res, err) {
	var statusCode = 500;
	var result = { status: statusCode };
	console.log('Error 500');
	console.error(err);
	return res.status(statusCode).send({ message: err.toString() });
}

function onReject(res, err){
	console.error(err);
	return res.status(statusCode).send({ message: err.toString() });
}

function validationError(res, err){
	return res.json(422, err);
}

module.exports = errorHandler;