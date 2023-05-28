const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const winston = require('./config/winston');
const morgan = require('morgan');
const routes = require('./src/routes/index');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swaggerFile');
const validateSchema = require('./src/middleware/inputValidationMiddleware');
const schemas = require('./src/schemas/validationSchemas');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0; 

const app = express(); // Start app
const PORT = process.env.PORT || 3000;
app.use(morgan('combined', { stream: winston.stream })); // for logging
app.use(cors()); // for CORS
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec)); // Swagger API documentation

// Routes
app.use('/', routes.getItems); // Get lists
app.use('/additem', [validateSchema(schemas.itemNameSchema), routes.addItem]);  // Add item to grocery list
app.use('/completeitem', [validateSchema(schemas.itemSchema), routes.completeItem]); // Complete item from grocery list
app.use('/deleteitem', [validateSchema(schemas.deleteItemSchema), routes.deleteItem]); // Delete item from list
app.use('/recoveritem',  [validateSchema(schemas.itemSchema), routes.recoverItem]); // Recover item from completed list to grocery list
app.use('/deleteallcompleted', routes.deleteAllCompleted); // Delete all the completed items
app.use('/recoverallcompleted', routes.recoverAllCompleted); // Recover all the completed items back to grocery list
app.use('/updateitem', [validateSchema(schemas.updateItemSchema), routes.updateItem]); // Update item
app.use('/updatestorecategories', [validateSchema(schemas.updateStoreCategoriesSchema), routes.updateStoreCategories]); // Update item

app.listen(PORT, () => {
	winston.info(`app is running on port ${PORT}`);
});