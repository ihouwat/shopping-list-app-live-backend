const handleUpdateItem = (req, res, db) => {
  const {id, note, count} = req.body
  // Update item in database
  db.select().from('items').where('id', '=', id).update('note', note).update('count', count).returning('*')
  .then(resp => {
    // Get updated item from database
    db.select().from('items').where('id', id)
    .then(item => {
      // Send updated item to the frontend
      res.json ({ updatedItem: item })
    })
  })
  .catch(err => res.status(400).json({errorMessage: 'Could not update item info.', statusCode: res.status(400).statusCode}));
}

module.exports = {
  handleUpdateItem
}