const mKnex = {
  count: jest.fn(),
  del: jest.fn().mockReturnThis(),
  returning: jest.fn().mockReturnThis(),
  select: jest.fn().mockReturnThis(),
  from: jest.fn().mockReturnThis(),
  where: jest.fn().mockReturnThis(),
  first: jest.fn().mockReturnThis(),
  insert: jest.fn().mockReturnThis(),
  raw: jest.fn().mockReturnThis(),
  update: jest.fn().mockReturnThis(),
  then: jest.fn(function (done) {
    done()
  }),
  catch: jest.fn().mockReturnThis(),
  items: () => jest.fn().mockReturnThis()
};

const mockKnex = jest.fn(() => mKnex);
const res = { status: (status) => ({statusCode: status, json: (data) => data})};

module.exports = {mockKnex, res};