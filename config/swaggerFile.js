const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
	openapi: '3.0.0',
	info: {
		title: 'Shopping App',
		version: '1.0.0',
	},
	components: {
		schemas: {
			AddItemRequest: {
				type: 'object',
				properties: {
					name: {
						type: 'string',
						description: 'The name of the item',
						example: 'Apple',
					},
				},
				required: ['name'],
			},
			AddedItemResponse: {
				type: 'object',
				properties: {
					addedItem: {
						type: 'array',
						items: {
							$ref: '#/components/schemas/Item',
						},
					},
				},
				required: ['addedItem'],
			},
			Item: {
				type: 'object',
				properties: {
					name: {
						type: 'string',
					},
					id: {
						type: 'string',
					},
					note: {
						type: 'string',
					},
					count: {
						type: 'integer',
					},
				},
			},
		},
	},
};


const options = {
	swaggerDefinition,
	apis: ['./routes/*.js']
};


const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
