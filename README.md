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
* `HEROKU_API_KEY`: for deployment
* `HEROKU_APP_NAME`: for deployment
* `HEROKU_EMAIL`: for deployment
* `POSTMAN_API_KEY`: for functional testing

## Project folder structure
* `.github`: contains CI/CD workflows
* `config`: contains configuration files for knex, swagger, and winston
* `data`: contains seed data for the database
* `docker`: contains Dockerfiles
* `postman`: contains postman collection and schemas for functional testing
* `src`: contains app code
* `test`: contains unit tests

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

## CI/CD pipeline
The CD pipeline consists of development, staging, and production environments. Each push to master will trigger a GitHub action that will run the following:
1. **Security** vulnerability checks
2. **Build stage**
	a. Lint checks
	b. Unit tests, including mock DB and integration-like tests with mock-knex tracker
	c. Build the app
3. **Deploy to staging environment**
4. **Functional tests**
5. **Visual regression tests**

Email reports are sent for all CI runs, regardless of the status of the run. Once all checks pass, the app is deployed automatically to production.

> Note: In addition to the pipeline above, the following **security checks are run on a weekly basis**: Snyk static scan monitoring and Github Dependabot for dependency security alerts and updates.

> Note: There is a Dockerfile to containerize the app, if desired.

## Functional testing
Functional tests are run with Postman CLI. Schemas and collections are in the `postman` folder. 
### Set environment variables
* `BASE_URL`: for testing in different environments
* `ENVIRONMENT`: use 'development', 'staging', and 'production' to test in different environments
### Set collection variables
* `schema`: for schema validation. To generate a schema, run `npm run schema` and copy the output `./postman/schemas/schema.json` content to the collection variable. Note that **some of the `anyOf` definitions and array schemas don't translate properly in Postman**, so don't override these. Ex: see groceryStoreModel and updateStoreCategoriesResponseSchema. Also manualy change openapi version to 3.1.0 in the schema file.
* `itemName`: random string to use for item name

### Run tests
Import the collection into Postman in order to run the tests either manually or with the Postman CLI.

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
* [postman](https://www.postman.com/) for functional testing
* [Rainforest QA](https://www.rainforestqa.com/) for visual regression testing

## License
All rights reserved.

## If I had more time...
* Granular **error responses**
* **Add authentication** to protect the API
* **Health check** endpoint
* **Secure endpoints with input validation** (protect against malicious requests)
* **Automate DB migrations** (ex: Liquibase)

> Note: The CI/CD pipeline adopts an automated **zero downtime deployment** approach. I realize some enterprises require manual intervention when deploying to higher environments, for example when needing approvals at different stages of the pipeline.