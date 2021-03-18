# FitIT API

A simple Node.js REST API written in TypeScript, connecting to a MongoDB database. Supports JWT authentication and hosts it's own documentation.

## Build it

npm install
tsc

## Supply your own .env file

Required variables:\
  `JWT_SECRET`\
  `MONGO_DB`\
  `MONGO_URL`\
  PORT

## Run it

node dist/server.js

## Tests

npm test

## API Endpoints

Endpoints are hosted using Swagger (Open API) and are accessible at localhost:port/docs

## Documentation

Documentation is hosted with Swagger UI at /docs.

## License

MIT
