const { mockKnex, res } = require('./testSetup');
const recoverAllCompleted = require('../../controllers/recoverAllCompleted');

describe('recover all completed items', () => {
	const db = mockKnex().instance;

	test('should return all items after successful recovery', async () => {
		const successResponse = {
			items: [{
				'name': 'Pasta',
				'id': '50jzy696i',
				'note': '',
				'count': 1
			}],
			completedItems: []
		};
		const actual = await recoverAllCompleted.handleRecoverAllCompleted({}, res({ successResponse }), db);
		expect(actual).toEqual(successResponse);
	});

	test('should return an error message and correct status code when the database fails to recover all completed items', async () => {
		const errorResponse = {errorMessage: 'Could not recover all completed items.', statusCode: 400};
		const actual = await recoverAllCompleted.handleRecoverAllCompleted({}, res({ errorResponse }), db);
		expect(actual).toEqual(errorResponse);
	});
});
