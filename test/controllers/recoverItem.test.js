const { mockKnex, res } = require('./testSetup');
const recoverItem = require('../../src/controllers/recoverItem');

const req = {
	body: {
		item: {
			name: 'apples',
			id: '50jzy696i',
			note: 'red',
			count: 1
		}
	}
};

describe('recover item', () => {
	const db = mockKnex().instance;

	test('should return the recovered item when the database successfully recovers an item', async () => {
		const successResponse = {item: {
			name: 'apples',
			id: '50jzy696i',
			note: 'red',
			count: 1
		}};
		const actual = await recoverItem.handleRecoverItem(req, res({ successResponse }), db);
		expect(actual).toEqual(successResponse);
	});

	test('should return an error message and correct status code when the database fails to recover an item', async () => {
		const errorResponse = {errorMessage: 'Could not recover item from completed list.', statusCode: 400};
		const actual = await recoverItem.handleRecoverItem(req, res({ errorResponse }), db);
		expect(actual).toEqual(errorResponse);
	});
});