// Using the library mock-knex
const MockKnex = require('mock-knex');
const knex = require('knex');

const res = (options = {}) => {
	const { successResponse = null, errorResponse = null } = options;
	if (successResponse) {
		return { 
			json: jest.fn().mockReturnValueOnce(successResponse), 
			status: jest.fn().mockReturnThis() 
		};
	} else if (errorResponse) {
		return {
			status: (status) => ({statusCode: status, json: (data) => data})
		};
	}
};

const createRes = (data, statusCode = 200) => ({
	json: jest.fn().mockReturnValueOnce(data),
	status: jest.fn().mockReturnThis(),
	statusCode: statusCode
});

const mockKnex = () => {
	const instance = knex({ client: 'pg' });
	MockKnex.mock(instance);
	const tracker = MockKnex.getTracker();
	return { instance, tracker };
};

module.exports = { res, mockKnex, createRes };