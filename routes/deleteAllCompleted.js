const router = require('express').Router();
const deleteAllCompleted = require('../controllers/deleteAllCompleted');
const db = require('../config/knexFile');

router.delete('/', (req, res) => {
	deleteAllCompleted.handleDeleteAllCompleted(req, res, db);
});

module.exports = router;
