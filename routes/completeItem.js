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
 *             $ref: '#/components/schemas/CompleteItemRequest'
 *     responses:
 *       200:
 *         description: Item completed successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CompletedItemResponse'
 *       400:
 *         description: Item not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ItemNotFoundResponse'
 */

router.put('/', (req, res) => {
	completeItem.handleCompleteItem(req, res, db);
});

module.exports = router;