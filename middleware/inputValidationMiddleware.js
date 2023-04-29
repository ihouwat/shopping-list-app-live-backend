const winston = require('../config/winston');

const inputValidationMiddleware = (schema) => (req, res, next) => {
	const { error } = schema.validate(req.body);
	if (error) {
		winston.info(error);
		return res.status(400).json({ error: error.details[0].message });
	}
	next();
};

module.exports = inputValidationMiddleware;
