const { mockKnex, res } = require('./testSetup');
const complete = require('../controllers/completeItem');

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

describe('complete item', () => {
	const db = mockKnex().instance;

	test('should return the completed item ID when the database successfully completes an item', async () => {
		const successResponse = { completedItemId: '50jzy696i' };
		const actual = await complete.handleCompleteItem(req, res({ successResponse }), db);
		expect(actual).toEqual(successResponse);
	});

	test('should return an error message and correct status code when the database fails to complete an item', async () => {
		const errorResponse = {errorMessage: 'Could not add item to completed list.', statusCode: 400};
		const actual = await complete.handleCompleteItem(req, res({ errorResponse }), db);
		expect(actual).toEqual(errorResponse);
	});

});