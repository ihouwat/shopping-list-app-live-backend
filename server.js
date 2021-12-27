const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors');
const knex = require('knex')
const getitems = require('./controllers/getItems');
const addItem = require('./controllers/addItem');
const completeitem = require('./controllers/completeItem');
const deleteitem = require('./controllers/deleteItem');
const recoveritem = require('./controllers/recoverItem');
const deleteallcompleted = require('./controllers/deleteAllCompleted');
const recoverallcompleted = require('./controllers/recoverAllCompleted');
const updateItem = require('./controllers/updateItem');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0; 
const db = knex({
  client: 'pg',
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: true,
  }
});

// // For local
// const db = knex({
//   client: 'pg',
//   connection: {
//     host : '127.0.0.1',
//     user : 'postgres',
//     password : 'admin',
//     database : 'quickshopper'
//   }
// });

const app = express(); // Start app
const PORT = process.env.PORT || 3000;
app.use(cors()); // for CORS
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.get('/', (req, res) => {getitems.getItemsOnLoad(req, res, db)}); // Get lists
app.post('/additem', (req, res) => {addItem.handleAddItem(req, res, db)}) // Add item to grocery list
app.put('/completeitem', (req, res) => {completeitem.handleCompleteItem(req, res ,db)}) // Complete item from grocery list
app.delete('/deleteitem', (req, res) => {deleteitem.handleDeleteItem(req, res ,db)}) // Delete item from list
app.put('/recoveritem', (req, res) => {recoveritem.handleRecoverItem(req, res, db)}) // Recover item from completed list to grocery list
app.delete('/deleteallcompleted', (req, res) => {deleteallcompleted.handleDeleteAllCompleted(req, res, db)}) // Delete all the completed items
app.put('/recoverallcompleted', (req, res) => {recoverallcompleted.handleRecoverAllCompleted(req, res, db)}) // Recover all the completed items back to grocery list
app.put('/updateitem', (req, res) => {updateItem.handleUpdateItem(req, res, db)}) // Update item

app.listen(PORT, () => {
  console.log(`app is running on port ${PORT}` );
});

/* ROUTES to build
/DONE getitemslists --> GET = success/fail for items, completed items, and favorites (top 10 count)
/DONE Add item --> PUT = grocery
/DONE Complete item -->  DELETE = from items & PUT completed items, PUT item count increased
/DONE Delete item --> DELETE = from list
/DONE Delete all items --> Delete all items from completed list
/DONE Recover item --> DELETE = from completed items & PUT items
/DONE Recover all items --> Recover all items from completed list to items list 
/DONE Add note --> Add note on modal in items list
/DONE Fetch item on modal open
*/