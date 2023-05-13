const { mockKnex, res } = require('./testSetup');
const updateStoreCategories = require('../../controllers/updateStoreCategories');

const req = { body: { itemName: 'Apples', stores: [{storeName: 'Meijer', category: 'Produce'}, {storeName: 'Kroger', category: 'Pets'}] }};

describe('update store categories', () => {
	const db = mockKnex().instance;

	test('should return all categories after successful update', async () => {
		const successResponse = {
			updatedModel: [
				{
					'id': 1,
					'name': 'Fresh Thyme',
					'categories': [
						{
							'items': [
								'Charcoal',
								'Flowers',
							],
							'category': 'Entrance',
							'storeOrder': 1
						},
						{
							'items': [
								'Bagels',
								'Bread',
								'Buns / Rolls',
							],
							'category': 'Bakery',
							'storeOrder': 2
						},
						{
							'items': [],
							'category': 'Uncategorized Items',
							'storeOrder': 3
						}
					]
				},
				{
					'id': 2,
					'name': 'Meijer',
					'categories': [
						{
							'items': [
								'Charcoal',
								'Flowers',
							],
							'category': 'Entrance',
							'storeOrder': 1
						},
						{
							'items': [
								'Bagels',
								'Bread',
								'Buns / Rolls',
							],
							'category': 'Bakery',
							'storeOrder': 2
						},
						{
							'items': [],
							'category': 'Uncategorized Items',
							'storeOrder': 3
						}
					]
				}
			],
		};
		const actual = await updateStoreCategories.handleUpdateStoreCategories(req, res({ successResponse }), db);
		expect(actual).toEqual(successResponse);
	});

	test('should return an error message and correct status code when the database fails to update store categories', async () => {
		const errorResponse = {errorMessage: 'Could not update grocery store categories.', statusCode: 400};
		const actual = await updateStoreCategories.handleUpdateStoreCategories(req, res({ errorResponse }), db);
		expect(actual).toEqual(errorResponse);
	});
});