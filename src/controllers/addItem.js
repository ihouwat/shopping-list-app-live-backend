const handleAddItem = (req, res, db) => {
	const item = req.body;
	const number = Math.random().toString(36).substr(2, 9);// unique ID
	// Insert a new item in the database
	return db.select().from('items').insert([{name: item.name, id: number, note: '', count: 1} ])
		.then(function(){
			// Get the added item from the database
			return db.select().from('items').where('name', item.name)
				.then(function(result){
					// Send the added item to the frontend
					return res.json({ addedItem: result });
				});
		})
		.catch(() => res.status(400).json({errorMessage: 'Could not add item to list.', statusCode: res.status(400).statusCode}));
};

module.exports={
	handleAddItem
};