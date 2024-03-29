const Joi = require('joi');

/* 
	These are schemas to validate client requests.
*/

const baseItemSchema = Joi.object({
	name: Joi.string().required(),
	id: Joi.string().required(),
	note: Joi.string().allow(''),
	count: Joi.number().required(),
});

const itemNameSchema = Joi.object({
	name: Joi.string().required(),
});

const itemSchema = Joi.object({
	item: baseItemSchema.required(),
});

const deleteItemSchema = Joi.object({
	listName: Joi.string().required(),
	id: Joi.string().required(),
});

const updateItemSchema = Joi.object({
	id: Joi.string().required(),
	note: Joi.string().allow(''),
	count: Joi.number().required(),
});

const updateStoreCategoriesSchema = Joi.object({
	itemName: Joi.string().required(),
	stores: Joi.array().items(Joi.object({
		storeName: Joi.string().required(),
		category: Joi.string().required(),
	})).required(),
});

module.exports = {
	itemNameSchema,
	itemSchema,
	deleteItemSchema,
	updateItemSchema,
	updateStoreCategoriesSchema,
	baseItemSchema
};
