const router = require('express').Router();
const completeItem = require('../controllers/completeItem');
const db = require('../config/knexFile');

/**
 * @swagger
 * /completeitem:
 *   put:
 *     summary: Complete item from grocery list
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
 *         description: Item completed successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/completeItemResponseSchema'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *            schema:
 *             $ref: '#/components/schemas/errorResponseSchema'
 */
router.put('/', (req, res) => {
	completeItem.handleCompleteItem(req, res, db);
});

module.exports = router;