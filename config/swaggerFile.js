const swaggerJSDoc = require('swagger-jsdoc');
const schemas = require('../schemas/swaggerSchemas');

const swaggerDefinition = {
	openapi: '3.0.0',
	info: {
		title: 'Shopping App',
		version: '1.0.0',
	},
	components: {
		schemas: {
			itemNameSchema: schemas.itemNameSchema,
			itemSchema: schemas.itemSchema,
			deleteItemSchema: schemas.deleteItemSchema,
			updateItemSchema: schemas.updateItemSchema,
			updateStoreCategoriesSchema: schemas.updateStoreCategoriesSchema,
			addItemResponseSchema: schemas.addItemResponseSchema,
			getItemResponseSchema: schemas.getItemResponseSchema,
			completeItemResponseSchema: schemas.completeItemResponseSchema,
			deleteItemResponseSchema: schemas.deleteItemResponseSchema,
			recoveredItemResponseSchema: schemas.recoveredItemResponseSchema,
			deleteAllItemsResponseSchema: schemas.deleteAllItemsResponseSchema,
			updateItemResponseSchema: schemas.updateItemResponseSchema,
			updateStoreCategoriesResponseSchema: schemas.updateStoreCategoriesResponseSchema,
			recoverAllCompletedResponseSchema: schemas.recoverAllCompletedResponseSchema
		},
	},
};


const options = {
	swaggerDefinition,
	apis: ['./routes/*.js']
};


const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
