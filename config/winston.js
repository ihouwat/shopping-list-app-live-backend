const winston = require('winston');

const options = {
	console: {
		level: 'debug',
		handleExceptions: true,
		json: false,
		colorize: true,
	},
};

const logger = new winston.createLogger({
	transports: [
		new winston.transports.Console(options.console)
	],
	exitOnError: false, // do not exit on handled exceptions
});

logger.stream = {
	// eslint-disable-next-line no-unused-vars
	write: function(message, encoding) {
		// use the 'info' log level so the output will be picked up by both transports (file and console)
		logger.info(message);
	},
};

module.exports = logger;