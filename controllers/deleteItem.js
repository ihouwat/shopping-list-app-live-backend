const handleDeleteItem = (req, res, db) => {
	const id = req.body.id;
	const listName = req.body.listName.toLowerCase(); // lowercase matches db table names
	// Identify the deleted item in the table and delete it
	return db(listName).where('id', '=', id).del()
		.then(() => {
			// Send the list name and deleted item back to frontend
			res.json({
				listName: listName,
				deletedItem: req.body.item,
			});
		})
		.catch(() => res.status(400).json({errorMessage: 'Could not delete item.', statusCode: res.status(400).statusCode}));
};

module.exports = {
	handleDeleteItem
};