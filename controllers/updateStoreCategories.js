const handleUpdateStoreCategories = (req, res, db) => {
	/* 
    Request will include an item and an array of stores with their respective categories to update with that item
    Example request body: {itemName: 'Apples', stores: [{storeName: 'Meijer', category: 'Produce'}, {storeName: 'Kroger', category: 'Pets'}]}
  */
	const item = req.body.itemName;
	const stores = req.body.stores;

	// Returns array of item name, store name, and updated categories for that store's model
	const updateModel = (model, storesObj) => {
		// checking the models from the DB against the store updates from the client
		let tripleArray = [];
		storesObj.map(store => model.map(storeModel => {
			if(store.storeName === storeModel.name) {
				let categoryToUpdate = storeModel.categories.find(cat => cat.category === store.category);
				// only add if item not already in category
				if(!categoryToUpdate.items.find(it => it.toLowerCase() === item.toLowerCase())) {
					const updatedItems = {...categoryToUpdate, ...categoryToUpdate.items.push(item)};
					tripleArray.push([item, store.storeName, storeModel.categories.map(cat => cat === categoryToUpdate ? cat = updatedItems : cat)]);
				}
			}
		}));
		return tripleArray;
	};

	// Updates all affected store categories and adds the item name to the groceries template table for autocomplete purposes
	const batchUpdate = (table, collection) => {
		// collection is an array of arrays of item name, store name, and updated categories, each representing a category to update for a store model
		return db.transaction(trx => {
			const queries = collection.map(tuple => {
				const [, storeName, updatedCategories] = tuple;
				return db(table)
					.where('name', storeName)
					.update('categories', JSON.stringify(updatedCategories))
					.transacting(trx);
			});
			return Promise.all(queries)
				.then(() => {
					return db('groceriestemplate').where('name', item) // item from the client
						.then((rows) => {
							if(rows.length === 0) return db('groceriestemplate').insert({name: item, count: 0});
						});
				})
				.then(trx.commit)
				.catch(trx.rollback);
		});
	};

	db.select().from('grocerystoremodel')
		.then(res => updateModel(res, stores))
		.then(collection => batchUpdate('grocerystoremodel', collection))
		.then(() => db.select().from('grocerystoremodel').orderBy('id', 'asc'))
		.then(updatedModel => res.send({updatedModel: updatedModel}))
		.catch(() => res.status(400).json({errorMessage: 'Could not update grocery store categories.', statusCode: res.status(400).statusCode}));
};

module.exports = {
	handleUpdateStoreCategories
};