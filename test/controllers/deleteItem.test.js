const { mockKnex, res } = require('./testSetup');
const deleteItem = require('../../src/controllers/deleteItem');

const item = {deletedItem: {name: 'item1', id: '123456789', note: '', count: 1}};
const req = {
	body: {
		item: item,
		listName: 'someListName'
	}
};

describe('delete item', () => {
	const db = mockKnex().instance;

	test('should return the deleted item when the database successfully deletes the item', async () => {
		const successResponse = {listName: req.body.listName, deletedItem: req.body.item};
		const actual = await deleteItem.handleDeleteItem(req, res({ successResponse }), db);
		expect(actual).toEqual(successResponse);
	});

	test('should return an error message and correct status code when the database fails to delete the item', async () => {
		const errorResponse = {errorMessage: 'Could not delete item.', statusCode: 400};
		const actual = await deleteItem.handleDeleteItem(req, res({ errorResponse }), db);
		expect(actual).toEqual(errorResponse);
	});

});