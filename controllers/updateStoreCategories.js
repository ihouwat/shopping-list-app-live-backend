const handleUpdateStoreCategories = (req, res, db) => {
  req.body.map(x => console.log(x));
  // Get updated item from database
  db.select().from('grocerystoremodel')
  .then(groceryStoreModel => {
    // Send updated item to the frontend
    res.json ({ updatedStoreModel: groceryStoreModel })
  })
  .catch(err => res.status(400).json('could not update store categories'))
}

module.exports = {
  handleUpdateStoreCategories
}