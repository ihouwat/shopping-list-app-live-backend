const validateSchema = require('../../src/middleware/inputValidationMiddleware');

describe('inputValidationMiddleware', () => {
	const schema = {
		validate: jest.fn()
	};
	const req = {
		body: {}
	};
	const res = {
		status: jest.fn().mockReturnThis(),
		json: jest.fn()
	};
	const next = jest.fn();

	it('should call next if no error', () => {
		schema.validate.mockReturnValue({});
		validateSchema(schema)(req, res, next);
		expect(next).toHaveBeenCalled();
	});

	it('should return 400 if error', () => {
		schema.validate.mockReturnValueOnce({ error: { details: [{ message: 'error' }]}});
		validateSchema(schema)(req, res, next);
		expect(res.status).toHaveBeenCalledWith(400);
		expect(res.json).toHaveBeenCalledWith({ error: 'error' });
	});
});