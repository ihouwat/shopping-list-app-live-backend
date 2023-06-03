# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.11] - 2023-06-03
### Added
- Github action to label pull requests
- Cleaned up Postman tests
- Automated dependency updates from Snyk

## [0.1.10] - 2023-05-29
### Added
- Dockerfile for containerization

### Changed
- Update CI workflow to deploy to Heroku staging environment and run functional tests
- Update README with secrets for Heroku deploys, folder structure, and CI/CD pipeline
- Download grocery store model and template data dumps
- Refactored folder structure
- Add functional tests to test for 400 errors 

## [0.1.9] - 2023-05-20
### Changed
- Updated `/deleteItem` to delete by id instead of name
- Update README to include instructions for running functional tests

### Added
- Script to generate schema for Postman tests
- File to document functional test workflow

## [0.1.8] - 2023-05-14
### Changed
- Moved postman tests out of test file

### Added
- Create postman folder for testing

## [0.1.7] - 2023-05-13
### Changed
- Externalized knex config
- Updated README with setup instructions, new commands, and license
- Add test:dev script in package.json
- Changed security testing action in CI pipeline

### Added
- Unit test for input validation middleware
- Swagger documentation for all endpoints

## [0.1.6] - 2023-04-29
### Added
- Swagger configs
- Begin adding swagger documentation
- Basic schema validation for requests
- Project goals file

### Changed
- Extract DB to knex file
- Extract routes to routes folder and add index.js
- Fixed update store categories method in Postman collection
- Updated readme

## [0.1.5] - 2023-04-16
### Added
- Tests for completeItem.js and recoverItem.js

### Changed
- Using mock-knex library for unit tests instead of handwritten mocks

## [0.1.4] - 2023-04-02
### Fixed
- Complete items was not working due to knex syntax error, following the update to knex
- Recover items was not working due to knex syntax error, following the update to knex

### Added
- Procfile for Heroku deployment
- Launch.json for debugging
- Postman collection for testing

### Changed
- Updated README.md
- Added snyk security test in CI pipeline

## [0.1.3] - 2023-04-01
### Added
- Linting configuration
### Changed
- Linting fixes across the project

## [0.1.2] - 2023-04-01
### Added
- Unit tests for getItems.js

## [0.1.1] - 2023-04-01
### Added
- Changelog
- Unit tests for updateItem.js
