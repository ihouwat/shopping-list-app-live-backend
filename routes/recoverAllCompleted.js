const router = require('express').Router();
const recoverAllCompleted = require('../controllers/recoverAllCompleted');
const db = require('../config/knexFile');

router.put('/', (req, res) => {
	recoverAllCompleted.handleRecoverAllCompleted(req, res, db);
});

module.exports = router;