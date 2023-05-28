const { mockKnex, res } = require('./testSetup');
const updateItem = require('../../src/controllers/updateItem');


const req = { body: { id: '50jzy696i', note: 'Pasta', count: 2 }};

describe('update item', () => {
	const db = mockKnex().instance;

	test('should return item after successful update', async () => {
		const successResponse = {
			updatedItem: [{
				'id': req.body.id,
				'note': req.body.note,
				'count': req.body.count
			}]
		};
    
		const actual = await updateItem.handleUpdateItem(req, res({ successResponse }), db);
		expect(actual).toEqual(successResponse);
	});

	test('should return an error message and correct status code when the database fails to update the item', async () => {
		const errorResponse = {errorMessage: 'Could not update item info.', statusCode: 400};
		const actual = await updateItem.handleUpdateItem(req, res({ errorResponse }), db);
		expect(actual).toEqual(errorResponse);
	});

});
