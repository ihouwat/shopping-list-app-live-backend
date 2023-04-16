const handleUpdateItem = (req, res, db) => {
	const {id, note, count} = req.body;
	// Update item in database
	return db.select().from('items').where('id', '=', id).update('note', note).update('count', count).returning('*')
		.then(() => {
			// Get updated item from database
			return db.select().from('items').where('id', id)
				.then(item => {
					// Send updated item to the frontend
					return res.json ({ updatedItem: item });
				});
		})
		.catch(() => res.status(400).json({errorMessage: 'Could not update item info.', statusCode: res.status(400).statusCode}));
};

module.exports = {
	handleUpdateItem
};