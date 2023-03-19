const mockKnex = require('./testSetup');
let db = require('../server');
jest.mock('../server', () => mockKnex);
const deleteAllCompleted = require('../controllers/deleteAllCompleted');

const req = {};
const res = { status: (status) => ({statusCode: status, json: (data) => data}), statusCode: 200};

describe('delete all completed', () => {
  test('should return the completed items table when the database successfully deletes all completed items', async () => {
    const expected = {completedItems: []};
    db().then.mockResolvedValueOnce(expected);
    const actual = await deleteAllCompleted.handleDeleteAllCompleted(req, res, db);
    expect(actual).toEqual(expected);
  });

  test('should return an error message when the database fails to delete all completed items', async () => {
    const expected = {errorMessage: 'Could not delete all completed items.', statusCode: 400};
    db().then.mockRejectedValueOnce('error');
    const actual = await deleteAllCompleted.handleDeleteAllCompleted(req, res, db);
    expect(actual).toEqual(expected);
  });

  test('should call the correct functions', async () => {
    expect(db().del).toBeCalled();
    expect(db().returning).toBeCalled();
    expect(db().then).toBeCalled();
  });

});