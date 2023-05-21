const handleDeleteItem = (req, res, db) => {
	const id = req.body.id;
	const listName = req.body.listName.toLowerCase(); // lowercase matches db table names
	// Identify the deleted item in the table and delete it
	return db(listName).where('id', '=', id).del().returning('*')
		.then((deletedItems) => {
			// Send the list name and deleted item back to frontend
			return res.json({
				listName: listName,
				deletedItem: deletedItems[0],
			});
		})
		.catch(() => res.status(400).json({errorMessage: 'Could not delete item.', statusCode: res.status(400).statusCode}));
};

module.exports = {
	handleDeleteItem
};