const router = require('express').Router();
const deleteAllCompleted = require('../controllers/deleteAllCompleted');
const db = require('../config/knexFile');

/**
 * @swagger
 * /deleteallcompleted:
 *   delete:
 *     summary: Delete all completed items from grocery list
 *     tags:
 *       - Items
 *     responses:
 *       200:
 *         description: Items deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/deleteAllItemsResponseSchema'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *            schema:
 *             $ref: '#/components/schemas/errorResponseSchema'
*/
router.delete('/', (req, res) => {
	deleteAllCompleted.handleDeleteAllCompleted(req, res, db);
});

module.exports = router;