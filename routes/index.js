// routes/index.js
const addItem = require('./addItem');
const completeItem = require('./completeItem');
const deleteAllCompleted = require('./deleteAllCompleted');
const deleteItem = require('./deleteItem');
const getItems = require('./getItems');
const updateItem = require('./updateItem');
const recoverItem = require('./recoverItem');
const recoverAllCompleted = require('./recoverAllCompleted');
const updateStoreCategories = require('./updateStoreCategories');

module.exports = {
	addItem,
	completeItem,
	deleteAllCompleted,
	deleteItem,
	getItems,
	updateItem,
	recoverItem,
	recoverAllCompleted,
	updateStoreCategories,
};