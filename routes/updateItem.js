const router = require('express').Router();
const updateItem = require('../controllers/updateItem');
const db = require('../config/knexFile');

router.put('/', (req, res) => {
	updateItem.handleUpdateItem(req, res, db);
});

module.exports = router;