const router = require('express').Router();
const deleteItem = require('../controllers/deleteItem');
const db = require('../config/knexFile');

router.delete('/', (req, res) => {
	deleteItem.handleDeleteItem(req, res, db);
});

module.exports = router;