const knex = require('knex');

const setConnectionConfig = () => {
	if (process.env.NODE_ENV === 'production') {
		return {
			connectionString: process.env.DATABASE_URL,
			ssl: true,
		};
	}
	// process.env.NODE === 'development'
	return {
		host : '127.0.0.1',
		user : 'postgres',
		password : 'admin',
		database : 'quickshopper'
	};
};

const db = knex({
	client: 'pg',
	connection: setConnectionConfig()
});

module.exports = db;
