const parse = require('joi-to-json');
const validationSchemas = require('./validationSchemas');
const Joi = require('joi');

/*
	These are schemas formatted specifically for Swagger documentation. These includes:
		- Request validation schemas
		- Response schemas
*/

const storeModelSchema = Joi.object({
	id: Joi.number(),
	name: Joi.string(),
	categories: Joi.alternatives().try(Joi.array().items(Joi.object({
		items: Joi.array().items(Joi.string()),
		category: Joi.string(),
		storeOrder: Joi.number()
	})), Joi.allow(null)),
});

const addItemResponseSchema = Joi.object({
	addedItem: validationSchemas.baseItemSchema,
});

const getItemResponseSchema = Joi.object({
	items: Joi.array().items(validationSchemas.baseItemSchema),
	completedItems: Joi.array().items(validationSchemas.baseItemSchema),
	favoriteItems: Joi.array().items(Joi.object({
		name: Joi.string(),
		isChecked: Joi.boolean(),
	})),
	groceriesTemplate: Joi.array().items(Joi.object({
		name: Joi.string(),
	})),
	groceryStoreModel: Joi.array().items(storeModelSchema),
});

const completeItemResponseSchema = Joi.object({
	completedItemId: Joi.string()
});

const deleteItemResponseSchema = Joi.object({
	listName: Joi.string(),
	deletedItem: Joi.object({
		name: Joi.string(),
	}),
});

const recoveredItemResponseSchema = Joi.object({
	recoveredItem: validationSchemas.baseItemSchema,
});

const deleteAllItemsResponseSchema = Joi.object({
	completeditems: Joi.array().length(0),
});

const updateItemResponseSchema = Joi.object({
	updatedItem: validationSchemas.baseItemSchema,
});

const updateStoreCategoriesResponseSchema = Joi.object({
	updatedModel: storeModelSchema
});

const recoverAllCompletedResponseSchema = Joi.object({
	items: Joi.array().items(validationSchemas.baseItemSchema),
	completedItems: Joi.array().length(0),
});

const errorResponseSchema = Joi.object({
	error: Joi.string(),
	statusCode: Joi.number(),
});

const responseSchemas = {
	addItemResponseSchema: parse(addItemResponseSchema, 'open-api'),
	getItemResponseSchema: parse(getItemResponseSchema, 'open-api'),
	completeItemResponseSchema: parse(completeItemResponseSchema, 'open-api'),
	deleteItemResponseSchema: parse(deleteItemResponseSchema, 'open-api'),
	recoveredItemResponseSchema: parse(recoveredItemResponseSchema, 'open-api'),
	deleteAllItemsResponseSchema: parse(deleteAllItemsResponseSchema, 'open-api'),
	updateItemResponseSchema: parse(updateItemResponseSchema, 'open-api'),
	updateStoreCategoriesResponseSchema: parse(updateStoreCategoriesResponseSchema, 'open-api'),
	recoverAllCompletedResponseSchema: parse(recoverAllCompletedResponseSchema, 'open-api'),
	errorResponseSchema: parse(errorResponseSchema, 'open-api'),
};

const validations = {
	itemNameSchema: parse(validationSchemas.itemNameSchema, 'open-api'),
	itemSchema: parse(validationSchemas.itemSchema, 'open-api'),
	deleteItemSchema: parse(validationSchemas.deleteItemSchema, 'open-api'),
	updateItemSchema: parse(validationSchemas.updateItemSchema, 'open-api'),
	updateStoreCategoriesSchema: parse(validationSchemas.updateStoreCategoriesSchema, 'open-api'),
};

module.exports = {...validations, ...responseSchemas};