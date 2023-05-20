const swaggerSpec = require('../config/swaggerFile');
const fs = require('fs');

// Save the Swagger specification as JSON file
fs.writeFileSync('./postman/schemas/schema.json', JSON.stringify(swaggerSpec, null, 2));