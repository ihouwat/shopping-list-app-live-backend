const mockKnex = require('./testSetup').mockKnex;
const res = require('./testSetup').res;
let db = require('../server');
jest.mock('../server', () => mockKnex);
const deleteItem = require('../controllers/deleteItem');

const item = {deletedItem: {name: 'item1', id: '123456789', note: '', count: 1}};
const req = {
	body: {
		item: item,
		listName: 'someListName'
	}
};

describe('delete item', () => {
	test('should return the deleted item when the database successfully deletes the item', async () => {
		const expected = {listName: req.body.listName, deletedItem: req.body.item};
		db().then.mockResolvedValueOnce(expected);
		const actual = await deleteItem.handleDeleteItem(req, res, db);
		expect(actual).toEqual(expected);
	});

	test('should return an error message and correct status code when the database fails to delete the item', async () => {
		const expected = {errorMessage: 'Could not delete item.', statusCode: 400};
		db().then.mockRejectedValueOnce('error');
		const actual = await deleteItem.handleDeleteItem(req, res, db);
		expect(actual).toEqual(expected);
	});

});