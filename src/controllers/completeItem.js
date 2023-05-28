const handleCompleteItem = (req, res, db) => {
	return db.transaction(trx => {
		const {name, id, note, count} = req.body.item;
		// Push item to completed items list and return id
		return trx('completeditems').insert({name: name, id: id, note: note, count: count})
			.returning('id')
			.then(responseId => { 
				// Delete same item from grocery list and return name
				return trx('items').where('id', '=', responseId[0].id).del().returning('name');
			})
			.then(responseName => {
				// If name in groceriestemplate, increment count by 1
				// This will be used to generate top ten faves on app load
				return trx('groceriestemplate').returning('*').where('name', '=', responseName[0].name).increment('count', 1).returning('*')
					.then(() => {
						// Send back item id to frontend
						res.json({ completedItemId: id }); 
					});
			})
			.then(trx.commit)
			.catch(trx.rollback);
	})
		.catch(() => res.status(400).json({errorMessage: 'Could not add item to completed list.', statusCode: res.status(400).statusCode}));
};

module.exports = {
	handleCompleteItem
};