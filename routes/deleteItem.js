const router = require('express').Router();
const deleteItem = require('../controllers/deleteItem');
const db = require('../config/knexFile');

/**
 * @swagger
 * /deleteitem:
 *   delete:
 *     summary: Delete an item from either the grocery list or the completed list
 *     tags:
 *       - Items
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/deleteItemSchema'
 *     responses:
 *       200:
 *         description: Item deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/deleteItemResponseSchema'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *            schema:
 *             $ref: '#/components/schemas/errorResponseSchema'
*/
router.delete('/', (req, res) => {
	deleteItem.handleDeleteItem(req, res, db);
});

module.exports = router;