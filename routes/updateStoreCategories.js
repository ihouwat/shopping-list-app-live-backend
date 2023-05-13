const router = require('express').Router();
const updateStoreCategories = require('../controllers/updateStoreCategories');
const db = require('../config/knexFile');

/**
 * @swagger
 * /updatestorecategories:
 *   put:
 *     summary: Update store category
 *     tags:
 *       - Items
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/updateStoreCategoriesSchema'
 *     responses:
 *       200:
 *         description: Item recovered successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/updateStoreCategoriesResponseSchema'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *            schema:
 *             $ref: '#/components/schemas/errorResponseSchema'
*/
router.put('/', (req, res) => {
	updateStoreCategories.handleUpdateStoreCategories(req, res, db);
});

module.exports = router;