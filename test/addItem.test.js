const addItem = require('../controllers/addItem');
const db = require('../server');

jest.mock('../server', () => {
  const mKnex = { 
    count: jest.fn(),
    select: jest.fn().mockReturnThis(),
    from: jest.fn().mockReturnThis(),
    where: jest.fn().mockReturnThis(),
    first: jest.fn().mockReturnThis(),
    insert: jest.fn().mockReturnThis(),
    raw: jest.fn().mockReturnThis(),
    then: jest.fn(function (done) {
      done()
    }),
    catch: jest.fn().mockReturnThis(),
    items: () => jest.fn().mockReturnThis(), };
  return jest.fn(() => mKnex);
});

const req = { body: { name: 'item' }};
const res = { status: (status) => ({statusCode: status, json: (data) => data}), statusCode: 200};

describe('add item', () => {
  test('should return item after successful insert', async () => {
    const expected = [{
      "name": "Pasta",
      "id": "50jzy696i",
      "note": "",
      "count": 1
    }];
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