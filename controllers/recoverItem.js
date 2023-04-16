const handleRecoverItem = (req, res, db) => {
	return db.transaction(trx => {
		const {name, id, note, count} = req.body.item;
		// Readd item to grocery list and return id
		return trx('items').insert([{name: name, id: id, note: note, count: count}]).returning('id')
			.then(responseId => {
				// Remove item from completed items list
				return trx('completeditems').where('id', '=', responseId[0].id).del().returning('*');
			})
			.then(response => {
				// Send back recovered item to frontend
				return res.json({ recoveredItem: response });
			});
	})
		.catch(() => res.status(400).json({errorMessage: 'Could not recover item from completed list.', statusCode: res.status(400).statusCode}));
};

module.exports = {
	handleRecoverItem
};