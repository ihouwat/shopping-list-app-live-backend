const addItem = require('../controllers/addItem');
const db = require('../server');

const expected = [
  {
    "name": "Pasta",
    "id": "50jzy696i",
    "note": "",
    "count": 1
  }
];

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
      done({addedItem: 'item'})
    }),
    catch: jest.fn().mockReturnThis(),
    items: () => jest.fn().mockReturnThis(), };
  return jest.fn(() => mKnex);
});

const req = {};
const res = {};

describe('testing add item', () => {
  
  test('testing this', async () => {
    db().then.mockResolvedValueOnce(expected)
    const actual = await addItem.handleAddItem(req, res, db())
    expect(actual).toEqual(expected);
  });
});
