const process = require('process');

const knex = require('knex');
const db = knex({
	client: 'pg',
	connection: {
		connectionString: process.env.DATABASE_URL,
		ssl: true,
	}
});

// // For local
// const db = knex({
// 	client: 'pg',
// 	connection: {
// 		host : '127.0.0.1',
// 		user : 'postgres',
// 		password : 'admin',
// 		database : 'quickshopper'
// 	}
// });

module.exports = db;
