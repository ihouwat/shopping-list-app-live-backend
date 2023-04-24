const { mockKnex, res, createRes } = require('./testSetup');
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

const db = mockKnex().instance;

describe('complete item', () => {

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

describe('handleCompleteItem with tracker', () => {
	const tracker = mockKnex().tracker;

	beforeEach((done) => {
		tracker.install();
		done();
	});

	afterEach((done) => {
		tracker.uninstall();
		done();
	});

	test('should complete an item and return the completed item ID', async () => {
		const req = {
			body: {
				item: {
					name: 'Item A',
					id: '50jzy696i',
					note: 'red',
					count: 1
				}
			}
		};

		const res = {
			json: jest.fn(),
			status: jest.fn().mockReturnThis(),
		};

		tracker.on('query', (query, step) => {
			if(step === 1) {
				expect(query.transacting).toBeTruthy();
				query.response([]);
			}
			if (step === 2) {
				expect(query.method).toBe('insert');
				expect(query.bindings).toEqual([ 1, '50jzy696i', 'Item A', 'red' ]);
				expect(query.returning).toBe('id');
				query.response([{id: '50jzy696i'}]);
			}
			else if (step === 3) {
				expect(query.method).toBe('del');
				expect(query.bindings).toEqual(['50jzy696i']);
				expect(query.transacting).toBeTruthy();
				expect(query.returning).toBe('name');
				query.response([{name: 'Item A'}]);
			} else if (step === 4) {
				expect(query.method).toBe('update');
				expect(query.bindings).toEqual( [ 1, 'Item A' ]);
				expect(query.transacting).toBeTruthy();
				query.response([]);
			} else if (step === 5) {
				expect(query.sql).toBe('COMMIT;');
			}
		});

		await complete.handleCompleteItem(req, res, db);
		expect(res.json).toHaveBeenCalledWith({ completedItemId: '50jzy696i' });
	});

	test('should return an error message and correct status code when the database fails to complete an item', async () => {
		const req = {
			body: {
				item: {
					name: 'Item A',
					id: '50jzy696i',
					note: 'red',
					count: 1
				}
			}
		};

		const res = createRes({}, 400);

		tracker.on('query', (query, step) => {
			if(step === 1) {
				expect(query.transacting).toBeTruthy();
				query.response([]);
			}
			if (step === 2) {
				expect(query.method).toBe('insert');
				expect(query.bindings).toEqual([ 1, '50jzy696i', 'Item A', 'red' ]);
				expect(query.returning).toBe('id');
				query.reject('Some error occurred.').catch(() => {});
			} else if (step === 3) {
				expect(query.sql).toBe('ROLLBACK;');
				query.response([]);
			}
		});

		await complete.handleCompleteItem(req, res, db);

		expect(res.status).toHaveBeenCalledWith(400);
		expect(res.json).toHaveBeenCalledWith({ errorMessage: 'Could not add item to completed list.', statusCode: 400 });
	});
});