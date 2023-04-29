const router = require('express').Router();
const updateStoreCategories = require('../controllers/updateStoreCategories');
const db = require('../config/knexFile');

router.put('/', (req, res) => {
	updateStoreCategories.handleUpdateStoreCategories(req, res, db);
});

module.exports = router;