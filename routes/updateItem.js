const router = require('express').Router();
const updateItem = require('../controllers/updateItem');
const db = require('../config/knexFile');

/**
 * @swagger
 * /updateitem:
 *   put:
 *     summary: Update an item
 *     tags:
 *       - Items
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/updateItemSchema'
 *     responses:
 *       200:
 *         description: Item recovered successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/updateItemResponseSchema'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *            schema:
 *             $ref: '#/components/schemas/errorResponseSchema'
*/
router.put('/', (req, res) => {
	updateItem.handleUpdateItem(req, res, db);
});

module.exports = router;