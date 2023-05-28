const router = require('express').Router();
const addItem = require('../controllers/addItem');
const db = require('../../config/knexFile');

/**
 * @swagger
 * /additem:
 *   post:
 *     summary: Add item to grocery list
 *     tags:
 *       - Items
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/itemNameSchema'
 *     responses:
 *       200:
 *         description: Item added successfully
 *         content:
 *           application/json:
 *            schema:
 *             $ref: '#/components/schemas/addItemResponseSchema'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *            schema:
 *             $ref: '#/components/schemas/errorResponseSchema'
 */
router.post('/', (req, res) => {
	addItem.handleAddItem(req, res, db);
});

module.exports = router;