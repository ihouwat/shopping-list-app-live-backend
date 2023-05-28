const { mockKnex, res } = require('./testSetup');
const deleteAllCompleted = require('../../src/controllers/deleteAllCompleted');

const req = {};

describe('delete all completed', () => {
	const db = mockKnex().instance;

	test('should return the completed items table when the database successfully deletes all completed items', async () => {
		const successResponse = {completedItems: []};
		const actual = await deleteAllCompleted.handleDeleteAllCompleted(req, res({ successResponse }), db);
		expect(actual).toEqual(successResponse);
	});

	test('should return an error message and correct status code  when the database fails to delete all completed items', async () => {
		const errorResponse = {errorMessage: 'Could not delete all completed items.', statusCode: 400};
		const actual = await deleteAllCompleted.handleDeleteAllCompleted(req, res({ errorResponse }), db);
		expect(actual).toEqual(errorResponse);
	});

});