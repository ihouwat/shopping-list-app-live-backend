const { mockKnex, res } = require('./testSetup');
const getItems = require('../../src/controllers/getItems');

const req = {};

describe('get items', () => {
	const db = mockKnex().instance;

	test('should return the items when the database successfully gets the items', async () => {
		const successResponse = {
			items: [{name: 'item1', id: '123456789', note: '', count: 1}],
			completedItems: [{name: 'item2', id: '987654321', note: '', count: 1}],
			favoriteItems: [{name: 'item3', isChecked: false}],
			groceriesTemplate: [{name: 'item4'}],
			groceryStoreModel: {name: 'Meijer', categories: [{category: 'Produce', items: ['Apples', 'Oranges']}, {category: 'Pets', items: ['Dog Food', 'Cat Food']}]}
		};
		const actual = await getItems.getItemsOnLoad(req, res({ successResponse }), db);
		expect(actual).toEqual(successResponse);
	});

	test('should return an error message and correct status code when the database fails to get the items', async () => {
		const errorResponse = {errorMessage: 'Could not get lists.', statusCode: 400};
		const actual = await getItems.getItemsOnLoad(req, res({ errorResponse }), db());
		expect(actual).toEqual(errorResponse);
	});

});