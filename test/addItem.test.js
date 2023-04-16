const { mockKnex, res } = require('./testSetup');
const addItem = require('../controllers/addItem');

const req = { body: { name: 'Pasta' }};

describe('add item', () => {
	const db = mockKnex().instance;

	test('should return item after successful insert', async () => {
		const successResponse = {
			addedItem: [{
				'name': req.body.name,
				'id': '50jzy696i',
				'note': '',
				'count': 1
			}]
		};
    
		const actual = await addItem.handleAddItem(req, res({ successResponse }), db);
		expect(actual).toEqual(successResponse);
	});

	test('should return an error message and correct status code when the database fails to insert the item', async () => {
		const errorResponse = {errorMessage: 'Could not add item to list.', statusCode: 400};
		const actual = await addItem.handleAddItem(req, res({ errorResponse }), db);
		expect(actual).toEqual(errorResponse);
	});
});