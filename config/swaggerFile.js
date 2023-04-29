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
		},
	},
};


const options = {
	swaggerDefinition,
	apis: ['./routes/*.js']
};


const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
