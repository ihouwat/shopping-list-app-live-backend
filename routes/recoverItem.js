const router = require('express').Router();
const recoverItem = require('../controllers/recoverItem');
const db = require('../config/knexFile');

router.put('/', (req, res) => {
	recoverItem.handleRecoverItem(req, res, db);
});

module.exports = router;