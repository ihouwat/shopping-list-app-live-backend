const getItemsOnLoad = (req, res, db) => {
  // Get the items table
  db.select().from('items') 
  .then(items => {
    // Get the completed items table
      db.select().from('completeditems') 
      .then(completeditems => {
        db.select().from('grocerystoremodel')
        .then(groceryStoreModel => {
          // Get the name column of the groceriestemplate table
          // in descending order by count number
          db.select('name').from('groceriestemplate').orderBy('count', 'desc')
          .then(groceriestemplate =>{
            // Put the top twenty items in the favoriteItems array
            let favoriteItems = [] 
            groceriestemplate.map((item, index) => {
              if (index < 20) {
                let obj = {name: item.name.trim(), isChecked: false} // trim removes whitespaces from db
                favoriteItems.push(obj)
              }
            })
            res.send({
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
          })
        });
      });
  }).catch(err => res.status(400).json({errorMessage: 'Could not get lists.', statusCode: res.status(400).statusCode}));
};

module.exports = {
  getItemsOnLoad
}