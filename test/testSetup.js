const mKnex = {
	count: jest.fn(),
	del: jest.fn().mockReturnThis(),
	returning: jest.fn().mockReturnThis(),
	select: jest.fn().mockReturnThis(),
	from: jest.fn().mockReturnThis(),
	where: jest.fn().mockReturnThis(),
	first: jest.fn().mockReturnThis(),
	insert: jest.fn().mockReturnThis(),
	raw: jest.fn().mockReturnThis(),
	update: jest.fn().mockReturnThis(),
	orderBy: jest.fn().mockReturnThis(),
	then: jest.fn(function (done) {
		done();
	}),
	catch: jest.fn().mockReturnThis(),
	items: () => jest.fn().mockReturnThis()
};

const mockKnexCustom = jest.fn(() => mKnex);
const res = { status: (status) => ({statusCode: status, json: (data) => data})};

// Using the library mock-knex
const MockKnex = require('mock-knex');
const knex = require('knex');

const mockKnexFromLib = knex({ client: 'pg' });
MockKnex.mock(mockKnexFromLib);
const tracker = MockKnex.getTracker();

module.exports = { mockKnex: mockKnexCustom, res, mockKnexFromLib, tracker };