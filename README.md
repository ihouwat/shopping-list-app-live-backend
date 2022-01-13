# Quick Shopper
Backend for shopping list app with Lauren, for personal use. Pairs with frontend [found here](https://github.com/ihouwat/shopping-list-app-live).

## Setup 

### Database

Create a PostgreSQL database called 'quickshopper' on your local machine (see db starter scripts). It includes four tables:

* **items**: stores the added grocery items. It includes four columns:

    * name (varchar)
    * id (varchar - primary key)
    * note (varchar)
    * count (smallint)

* **completeditems**: stores the completed items. It includes four columns, same as above.

* **groceriestemplate**: is used to fetch top 10 favorites on app load and to populate the autocomplete search input. It includes two columns:

    * name (varchar - primary key)
    * count (integer - not null)

* **grocerystoremodel**: is used to fetch and update store layouts. It includes three columns:

    * id (integer - primary key)
    * name (varchar)
    * categories (jsonb)

### Customize the database connection

* In `server.js`, edit the server credentials

### Start the server

* `npx nodemon server.js` starts the server on port 3000

## Technologies Used 
* [body-parser](https://www.npmjs.com/package/body-parser): Node.js body parsing middleware
* [cors](https://www.npmjs.com/package/cors): to provide a Connect/Express middleware that can be used to enable CORS
* [express](https://www.npmjs.com/package/express): To set up server
* [knex](https://www.npmjs.com/package/knex): A SQL query builder in JavaScript
* [pg](https://www.npmjs.com/package/pg): PostgreSQL client for Node.js. Uses pure JavaScript
* [nodemon](https://www.npmjs.com/package/nodemon): A development utility that monitors for any changes in the code and automatically restarts the server
