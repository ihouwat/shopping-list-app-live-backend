const handleUpdateStoreCategories = (req, res, db) => {
  const item = req.body.itemName;
  const stores = req.body.stores;

  // Returns array of item name, store name, and updated categories for that store's model
  const updateModel = (model, storesObj) => {
    let tripleArray = []
    storesObj.map(store => model.map(storeModel => {
      if(store.storeName === storeModel.name) {
        let categoryToUpdate = storeModel.categories.find(cat => cat.category === store.category);
        if(!categoryToUpdate.items.find(it => it.toLowerCase() === item.toLowerCase())) {
          updatedItems = {...categoryToUpdate, ...categoryToUpdate.items.push(item)};
          tripleArray.push([item, store.storeName, storeModel.categories.map(cat => cat === categoryToUpdate ? cat = updatedItems : cat)])
        }
      }
    }))
    return tripleArray;
  }

  // Updates all affected store categories and adds the item name to the groceries template table for autocomplete purposes
  const batchUpdate = (table, collection) => {
    return db.transaction(trx => {
      const queries = collection.map(tuple => {
        [itemName, storeName, updatedCategories] = tuple;
        return db(table)
          .where('name', storeName)
          .update('categories', JSON.stringify(updatedCategories))
          .transacting(trx)
      });
      return Promise.all(queries)
        .then(() => {
          return db('groceriestemplate').where('name', item)
            .then((rows) => {
              if(rows.length === 0) return db('groceriestemplate').insert({name: item, count: 0});
            })
        })
        .then(trx.commit)
        .catch(trx.rollback)
    })
  }

  db.select().from('grocerystoremodel')
  .then(res => updateModel(res, stores))
  .then(collection => batchUpdate('grocerystoremodel', collection))
  .then(() => db.select().from('grocerystoremodel').orderBy('id', 'asc'))
  .then(updatedModel => res.send({updatedModel: updatedModel}))
  .catch(err => res.status(400).json({errorMessage: 'Could not update grocery store categories.', statusCode: res.status(400).statusCode}));
}

module.exports = {
  handleUpdateStoreCategories
}