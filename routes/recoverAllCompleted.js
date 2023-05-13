const router = require('express').Router();
const recoverAllCompleted = require('../controllers/recoverAllCompleted');
const db = require('../config/knexFile');

/**
 * @swagger
 * /recoverallcompleted:
 *   put:
 *     summary: Recover all completed items to main grocery list
 *     tags:
 *       - Items
 *     responses:
 *       200:
 *         description: Items recovered successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/recoverAllCompletedResponseSchema'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *            schema:
 *             $ref: '#/components/schemas/errorResponseSchema'
*/
router.put('/', (req, res) => {
	recoverAllCompleted.handleRecoverAllCompleted(req, res, db);
});

module.exports = router;