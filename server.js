const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./config/knexFile');
const winston = require('./config/winston');
const morgan = require('morgan');
const getItems = require('./routes/getItems');
const addItem = require('./routes/addItem');
const completeItem = require('./routes/completeItem');
const deleteItem = require('./routes/deleteItem');
const recoverItem = require('./routes/recoverItem');
const deleteAllCompleted = require('./routes/deleteAllCompleted');
const recoverallcompleted = require('./controllers/recoverAllCompleted');
const updateItem = require('./controllers/updateItem');
const updateStoreCategories = require('./controllers/updateStoreCategories');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swaggerFile');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0; 

const app = express(); // Start app
const PORT = process.env.PORT || 3000;
app.use(morgan('combined', { stream: winston.stream })); // for logging
app.use(cors()); // for CORS
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec)); // Swagger API documentation

// Routes
app.use('/', getItems); // Get lists
app.use('/additem', addItem);  // Add item to grocery list
app.use('/completeitem', completeItem); // Complete item from grocery list
app.use('/deleteitem', deleteItem); // Delete item from list
app.use('/recoveritem', recoverItem); // Recover item from completed list to grocery list
app.use('/deleteallcompleted', deleteAllCompleted); // Delete all the completed items
app.put('/recoverallcompleted', (req, res) => {recoverallcompleted.handleRecoverAllCompleted(req, res, db);}); // Recover all the completed items back to grocery list
app.put('/updateitem', (req, res) => {updateItem.handleUpdateItem(req, res, db);}); // Update item
app.put('/updatestorecategories', (req, res) => {updateStoreCategories.handleUpdateStoreCategories(req, res, db);}); // Update item

app.listen(PORT, () => {
	winston.info(`app is running on port ${PORT}`);
});