require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const routes = require('./routes');

class AppController {

  constructor() {
    this.express = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.express.use(morgan('common'));
    this.express.use(express.json());
  }
  routes() {
    this.express.use(routes);
  }
}

module.exports = new AppController().express;
