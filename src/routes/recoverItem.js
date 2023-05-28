const router = require('express').Router();
const recoverItem = require('../controllers/recoverItem');
const db = require('../../config/knexFile');

/**
 * @swagger
 * /recoveritem:
 *   put:
 *     summary: Recover one completed items to main grocery list
 *     tags:
 *       - Items
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/itemSchema'
 *     responses:
 *       200:
 *         description: Item recovered successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/recoveredItemResponseSchema'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *            schema:
 *             $ref: '#/components/schemas/errorResponseSchema'
*/
router.put('/', (req, res) => {
	recoverItem.handleRecoverItem(req, res, db);
});

module.exports = router;