require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const routes = require('./routes');

class AppController {

  constructor() {
    this.express = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    if(process.env.NODE_ENV !== 'production') {
      this.express.use(cors({
        origin: '*'
      }));
    }
    
    this.express.use(morgan('common'));
    this.express.use(express.json());
  }
  routes() {
    this.express.use(routes);
  }
}

module.exports = new AppController().express;
