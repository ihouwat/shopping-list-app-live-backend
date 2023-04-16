const mockKnex = require('./testSetup').mockKnex;
const res = require('./testSetup').res;
const db = require('../server');
jest.mock('../server', () => mockKnex);
const updateItem = require('../controllers/updateItem');


const req = { body: { id: '50jzy696i', note: 'Pasta', count: 2 }};

describe('update item', () => {
	test('should return item after successful update', async () => {
		const expected = {
			updatedItem: [{
				'id': req.body.id,
				'note': req.body.note,
				'count': req.body.count
			}]
		};
    
		db().then.mockResolvedValueOnce(expected);
		const actual = await updateItem.handleUpdateItem(req, res, db());
		expect(actual).toEqual(expected);
	});

	test('should return an error message and correct status code when the database fails to update the item', async () => {
		const expected = {errorMessage: 'Could not update item info.', statusCode: 400};
		db().then.mockRejectedValueOnce('error');
		const actual = await updateItem.handleUpdateItem(req, res, db());
		expect(actual).toEqual(expected);
	});

});
