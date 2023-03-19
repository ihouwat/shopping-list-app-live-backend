const mockKnex = require('./testSetup').mockKnex;
const res = require('./testSetup').res;
const db = require('../server');
jest.mock('../server', () => mockKnex);
const addItem = require('../controllers/addItem');

const req = { body: { name: 'Pasta' }};

describe('add item', () => {
  test('should return item after successful insert', async () => {
    const expected = {
      addedItem: [{
        "name": req.body.name,
        "id": "50jzy696i",
        "note": "",
        "count": 1
      }]
    };
    
    db().then.mockResolvedValueOnce(expected);
    const actual = await addItem.handleAddItem(req, res, db());
    expect(actual).toEqual(expected);
  });

  test('should return an error message when the database fails to insert the item', async () => {
    db().then.mockRejectedValueOnce('error');
    const actual = await addItem.handleAddItem(req, res, db());
    const expected = {errorMessage: 'Could not add item to list.', statusCode: 400};
    expect(actual).toEqual(expected);
  });
});