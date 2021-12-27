const handleDeleteItem = (req, res, db) => {
  const {name} = req.body.item
  const listName = req.body.listName.toLowerCase() // lowercase matches db table names
  // Identify the deleted item in the table and delete it
  db(listName).where('name', '=', name).del()
  .then(() => {
    // Send the list name and deleted item back to frontend
    res.json({
      listName: listName,
      deletedItem: req.body.item,
    })
  })
  .catch(err => res.status(400).json('could not delete item'))
}

module.exports = {
  handleDeleteItem
}