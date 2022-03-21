require('dotenv').config();


const express = require("express");
const app = express();
const db = require("./app/models");
const routes = require('./app/routes');

// Middlewares
const accessTokenMiddleware = require("./app/middlewares/accessToken.middleware");
const errorHandlerMiddleware = require("./app/middlewares/errorHandler.middleware");
const polyglotMiddleware = require("./app/middlewares/polyglot.middleware");
const createLocaleMiddleware = require('express-locale');

//Errors
const errorHandler = require("./app/errors/handler");
const InternalError = require("./app/errors/internal.error");

//sync database
db.sequelize.sync({
  force: false,
  logging: false
});

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Get the user's locale, and set a default in case there's none
app.use(createLocaleMiddleware({
  "priority": ["accept-language", "default"],
  "default": "en_US"
}))

// fix cors error
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", req.headers.origin); //change this 
  res.header("Access-Control-Allow-Headers", "x-requested-with, content-type,Authorization");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

// handle localization
app.use(polyglotMiddleware);

// add routes
app.use(accessTokenMiddleware, routes);

//error handler
app.use(errorHandlerMiddleware);

// set port, listen for requests
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}.`);
});


// get the unhandled rejection and throw it to another fallback handler we already have.
process.on('unhandledRejection', (reason, promise) => {
  throw new InternalError('UnHandledRejection',reason.message);
});

process.on('uncaughtException', async (error) => {
  await errorHandler.handleError(error);
  if (!errorHandler.isTrustedError(error)) {
    process.exit(1);
  }
});