const { mockKnexFromLib, res } = require('./testSetup');

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
	test('should return the completed item ID table when the database successfully completes an item', async () => {
		const expected = { completedItemId: '50jzy696i' };
		const db = mockKnexFromLib;
		const res = { json: jest.fn().mockReturnValueOnce(expected), status: jest.fn().mockReturnThis() };
		const actual = await complete.handleCompleteItem(req, res, db);
		expect(actual).toEqual(expected);
	});

	test('should return an error message and correct status code when the database fails to complete an item', async () => {
		const expected = {errorMessage: 'Could not add item to completed list.', statusCode: 400};
		const actual = await complete.handleCompleteItem(req, res, mockKnexFromLib);
		expect(actual).toEqual(expected);
	});

});