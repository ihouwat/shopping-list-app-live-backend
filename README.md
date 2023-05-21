# Quick Shopper
Backend for shopping list app with Lauren, for personal use. Pairs with frontend [found here](https://github.com/ihouwat/shopping-list-app-live).

This project is a live app I use personally, and I use it as a sandbox for practices like CI/CD, testing, security. For more, see [project goals](./projectGoals.md).

Check out API docs with `/api-docs` endpoint.

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

### Configure the database connection

* In `config/knexFile.js`, edit the server credentials

### Set environment variables
* `NODE_ENV`: set to 'development' or 'production'
* `DATABASE_URL`: connection string

### Set CI secrets
* `RAINFOREST_API_TOKEN`: for visual regression testing
* `SNYK_TOKEN`: for security testing

## Commands
### Start the server
`npm run start:dev` starts the server on port 3000

### Run unit tests
`npm run test:dev` for verbose output and watch mode

`npm run test` for CI

### Run linter
`npm run lint`

### Remote debugging
Port is exposed through the Procfile. To forward the port, run:
`heroku ps:forward 9090 -a {{app_name}}`

## Functional testing
Functional tests are run with Newman and Postman. Schemas and collections are in the `postman` folder. 
### Set environment variables
* `BASE_URL`: for testing in different environments
### Set collection variables
* `baseURL`: for testing in different environments
* `schema`: for schema validation. To generate a schema, run `npm run schema` and copy the output `./postman/schemas/schema.json` content to the collection variable. Note that **some of the `anyOf` definitions will not work in Postman**, so don't override these. Ex: see groceryStoreModel and updateStoreCategoriesResponseSchema. Also manualy change openapi version to 3.1.0 in the schema file.
* `itemName`: random string to use for item name

### Run tests
Import the collection into Postman in order to run the tests.

## Technologies Used 
* [body-parser](https://www.npmjs.com/package/body-parser): Node.js body parsing middleware
* [cors](https://www.npmjs.com/package/cors): to provide a Connect/Express middleware that can be used to enable CORS
* [express](https://www.npmjs.com/package/express): To set up server
* [knex](https://www.npmjs.com/package/knex): A SQL query builder in JavaScript
* [pg](https://www.npmjs.com/package/pg): PostgreSQL client for Node.js. Uses pure JavaScript
* [nodemon](https://www.npmjs.com/package/nodemon): A development utility that monitors for any changes in the code and automatically restarts the server
* [mock-knex](https://www.npmjs.com/package/mock-knex): to unit test controllers
* [eslint](https://eslint.org/): to lint code
* [joi](https://joi.dev/) for schema validation
* [swagger](https://swagger.io/) for API documentation
* [postman](https://www.postman.com/) and [newman](https://www.npmjs.com/package/newman) for functional testing

## License
All rights reserved.