# Maze API [![Build Status](https://travis-ci.org/wearereasonablepeople/maze-api.svg?branch=master)](https://travis-ci.org/wearereasonablepeople/maze-api)

## Requirements

1. [Docker](https://docs.docker.com/)
1. [Nodejs](https://nodejs.org/en/) > 6

## Commands

### Testing
- `npm run lint` - lint files
- `npm run test:unit` - run unit tests
- `npm run test:integration` - run integration tests
- `npm test` - run lint and **all** the test

### Start
- `npm start` - setups the database and start the server
- `npm run dev` - starts the server with automatic restart if changes been made
- `npm run pm2` - starts the server with pm2 and optimized conditions

### Setup
- `npm run db:migrate`: executes all database migrations,
- `npm run db:seed`: executes all database seeds,
- `npm run db:start`: starts the database,
- `npm run db:stop`: stops the database,
- `npm run db:restart`: restart the database,
- `npm run db:setup`: start the database and executes migrations/seeds
