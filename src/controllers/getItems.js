const getItemsOnLoad = (req, res, db) => {
	// Get the items table
	return db.select().from('items') 
		.then(items => {
			// Get the completed items table
			return db.select().from('completeditems') 
				.then(completeditems => {
					return db.select().from('grocerystoremodel')
						.then(groceryStoreModel => {
							// Get the name column of the groceriestemplate table
							// in descending order by count number
							return db.select('name').from('groceriestemplate').orderBy('count', 'desc')
								.then(groceriestemplate =>{
									// Put the top favorite items in the favoriteItems array
									let favoriteItems = []; 
									groceriestemplate.map((item, index) => {
										if (index < 25) {
											let obj = {name: item.name.trim(), isChecked: false}; // trim removes whitespaces from db
											favoriteItems.push(obj);
										}
									});
									return res.send({
										// The grocery list
										items: items,
										// The completed items list
										completedItems: completeditems,
										// The top favorites list
										favoriteItems: favoriteItems,
										// The groceriestemplate, which tracks purchase history
										// The historiacally top ten acquired groceries come from this list 
										groceriesTemplate: groceriestemplate,
										// Template of grocery stores
										groceryStoreModel: groceryStoreModel
									});
								});
						});
				});
		}).catch(() => res.status(400).json({errorMessage: 'Could not get lists.', statusCode: res.status(400).statusCode}));
};

module.exports = {
	getItemsOnLoad
};