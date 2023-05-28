const router = require('express').Router();
const getitems = require('../controllers/getItems');
const db = require('../../config/knexFile');

/**
 * @swagger
 * /:
 *   get:
 *     summary: Get items on load
 *     tags:
 *       - Items
 *     responses:
 *       200:
 *         description: App metadata and items retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/getItemResponseSchema'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *            schema:
 *             $ref: '#/components/schemas/errorResponseSchema'
*/
router.get('/', (req, res) => {
	getitems.getItemsOnLoad(req, res, db);
});

module.exports = router;