# term-project-team-j
term-project-team-j created by GitHub Classroom

## UNO by Team J
Takahiro Odaka, Ellis Payne Perkins, Joe S Phabmixay, and Ivan Flores Villamar

## Task list for Milestone 2
- [x] Install **Node.js** by going to [official Node.js website.](https://nodejs.org/en/)
- [x] Install the **express-generator package** using `npm install express-generator -g`
- [x] Create Express app with `express -view=pug myapp-uno`
- [x] Install dependencies using `cd myapp-uno` then `npm install`
- [x] Set up **nodemon** with `npm i --save-dev nodemon`
- [x] Add `"start:dev": "DEBUG=myapp-uno:* nodemon ./bin/www"` to the scripts section of package.json **See DISCUSSION Section of Milestone 2 Document**
- [x] Set up **dotenv** and add .env file to .gitignore using `npm i --save dotenv` then `echo ".env" >> .gitignore` then `touch .env`
- [x] Add the following to **app.js**:
```
if(process.env.NODE_ENV === 'development') {
  require("dotenv").config();
}
```
- [x] Install and download **PostgreSQL** at their official [website](https://www.postgresql.org/download/)
- [x] Create database with `createdb myapp_uno_db` **See DISCUSSION Section of Milestone 2 Document**
- [x] Install **pg-promise** using `npm i --save pg-promise`
- [x] Add **db/index.js** to the app with the following content:
```
const pgp = require('pg-promise')();
const connection = pgp(process.env.DATABASE_URL);
module.exports = connection;
```
- [x] Add the DATABASE_URL environment variable to our .env with `echo DATABASE_URL=postgres://`whoami`@localhost:5432/myapp_uno_db >> .env`
- [x] Install the sequelize and sequelize CLI packages, and then initialize using `npm i --save sequelize`, then `npm install --save sequelize-cli`, and then `node_modules/.bin/sequelize init`.
- [x] Rename config/config.json to config/config.js and replace contents with the following:
```
require('dotenv').config();

module.exports = {
  "development": {
    "use_env_variable": "DATABASE_URL",
    "dialect": "postgres"
  },
  "test": {
    "use_env_variable": "DATABASE_URL",
    "dialect": "postgres"
  },
  "production": {
    "use_env_variable": "DATABASE_URL",
    "dialect": "postgres"
  }
}
```
- [x] Add the following to the package.json file:
```
"db:create:migration": "sequelize migration:generate --name ",
"db:migrate": "sequelize db:migrate",
"db:rollback": "sequelize db:migrate:undo”
```
- [x] Create our first migration with `npm run db:create:migration first-migration` which will create a new migration file in the migrations/ folder
- [x] Add the following contents to the new migration file: 
```
'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'test_table',
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        createdAt: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal('NOW()'),
          allowNull: false
        },
        testString: {
          type:Sequelize.STRING,
          allowNull: false
        }
      }
    );
  },
 
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('test_table');
  }
};
``` 
- [ ] Run the migration with `npm run db:migrate` 
- [ ] Add a tests route with the following contents:
```
const express = require("express");
const router = express.Router();
const db = require('../db');

router.get("/", (request, response) => {
  db.any(`INSERT INTO test_table ("testString") VALUES ('Hello at $
{Date.now()}')`)
    .then( _ => db.any(`SELECT * FROM test_table`) )
    .then( results => response.json( results ) )
    .catch( error => {
      console.log( error )
      response.json({ error })
    })
});

module.exports = router;
```
- [ ] Deploy to **Heroku**
