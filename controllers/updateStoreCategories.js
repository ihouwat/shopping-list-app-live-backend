const handleUpdateStoreCategories = (req, res, db) => {

  const updateFunction = (store, item) => {
    return store[0]?.categories.map(category => {
      if (category.category.includes(item.category)) {
        let arr = category;
        arr.items.push(item.itemName);
        return category = arr;
      } else return category;
    })
  }

  try {
    // Get updated item from database
    req.body.forEach(item => {
      db.select().from('grocerystoremodel').where('name', item.storeName)
      .then(res => updateFunction(res, item))
      .then(push => db.select().from('grocerystoremodel').where('name', item.storeName).update('categories', JSON.stringify(push)).returning('*'))
      .then(()=>  db.select().from('grocerystoremodel').orderBy('id', 'asc'))
      .then(groceryStoreModel => res.json ({ updatedStoreModel: groceryStoreModel })
      )
    })
  }
  catch {
    res.status(400).json('could not update store categories')
  }
}

module.exports = {
  handleUpdateStoreCategories
}