const { mockKnex, res, createRes } = require('./testSetup');
const addItem = require('../../controllers/addItem');

const req = { body: { name: 'Pasta' }};

const db = mockKnex().instance;

describe('add item', () => {

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

describe('handleAddItem with tracker', () => {
	const tracker = mockKnex().tracker;

	beforeEach((done) => {
		tracker.install();
		done();
	});

	afterEach((done) => {
		tracker.uninstall();
		done();
	});

	test('should add an item and return the added item', async () => {
		const req = {
			body: {
				name: 'Item A',
			},
		};

		const res = {
			json: jest.fn(),
			status: jest.fn().mockReturnThis(),
		};

		tracker.on('query', (query, step) => {
			if (step === 1) {
				expect(query.method).toBe('insert');
				expect(query.bindings).toEqual([ 1, expect.any(String), 'Item A', '']);
				query.response([]);
			} else if (step === 2) {
				expect(query.method).toBe('select');
				expect(query.bindings).toEqual(['Item A']);
				query.response([{ id: expect.any(String), name: 'Item A', note: '', count: 1 }]);
			}
		});

		await addItem.handleAddItem(req, res, db);

		expect(res.json).toHaveBeenCalledWith({ addedItem: [{ id: expect.any(String), name: 'Item A', note: '', count: 1 }]});
		expect(res.status).not.toHaveBeenCalled();
	});

	test('should handle errors and return an error message', async () => {
		const req = {
			body: {
				name: 'Item A',
			},
		};

		const res = createRes({}, 400);
		
		tracker.on('query', (query, step) => {
			if (step === 1) {
				expect(query.method).toBe('insert');
				expect(query.bindings).toEqual([ 1, expect.any(String), 'Item A', '']);
				query.reject('Some error occurred.');
			}
		});

		await addItem.handleAddItem(req, res, db);

		expect(res.json).toHaveBeenCalledWith({ errorMessage: 'Could not add item to list.', statusCode: 400 });
		expect(res.status).toHaveBeenCalledWith(400);
	});
});
