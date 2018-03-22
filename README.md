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
- [ ] Add `"start:dev": "DEBUG=myapp-uno:* nodemon ./bin/www"` to the scripts section of package.json
- [ ] Set up **dotenv** and add .env file to .gitignore using `npm i --save dotenv` then `echo ".env" >> .gitignore` then `touch .env`
- [ ] Add the following to **app.js**
```

if(process.env.NODE_ENV === 'development') {
  require("dotenv").config();
}
```
- [ ] Set up **pg-promise database**
- [ ] Set up **sequelize-cli** migration
- [ ] Add a tests route
- [ ] Deploy to **Heroku**
