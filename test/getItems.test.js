const mockKnex = require('./testSetup').mockKnex;
const res = require('./testSetup').res;
let db = require('../server');
jest.mock('../server', () => mockKnex);
const getItems = require('../controllers/getItems');

const req = {};

describe('get items', () => {
  test('should return the items when the database successfully gets the items', async () => {
    const expected = {
      items: [{name: 'item1', id: '123456789', note: '', count: 1}],
      completedItems: [{name: 'item2', id: '987654321', note: '', count: 1}],
      favoriteItems: [{name: 'item3', isChecked: false}],
      groceriesTemplate: [{name: 'item4'}],
      groceryStoreModel: {name: 'Meijer', categories: [{category: 'Produce', items: ['Apples', 'Oranges']}, {category: 'Pets', items: ['Dog Food', 'Cat Food']}]}
    };
    db().then.mockResolvedValueOnce(expected);
    const actual = await getItems.getItemsOnLoad(req, res, db());
    expect(actual).toEqual(expected);
  });

  test('should return an error message and correct status code when the database fails to get the items', async () => {
    const expected = {errorMessage: 'Could not get lists.', statusCode: 400};
    db().then.mockRejectedValueOnce('error');
    const actual = await getItems.getItemsOnLoad(req, res, db());
    expect(actual).toEqual(expected);
  });

  test('should call the correct functions', async () => {
    expect(db().select).toBeCalled();
    expect(db().from).toBeCalled();
  });
});