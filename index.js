require('dotenv').config();


const express = require("express");
const app = express();
const db = require("./models");
const routes = require('./routes');
const accessTokenMiddleware = require("./middlewares/accessTokenMiddleware");
const errorHandlerMiddleware = require("./middlewares/errorHandlerMiddleware");
const errorHandler = require("./errors/errorhandler");

//sync database
db.sequelize.sync({
  force: true,
  logging: false
});

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// fix cors error
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", req.headers.origin); //change this 
  res.header("Access-Control-Allow-Headers", "x-requested-with, content-type,Authorization");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

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
  throw reason;
});

process.on('uncaughtException', (error) => {
  errorHandler.handleError(error);
  if (!errorHandler.isTrustedError(error)) {
    process.exit(1);
  }
});