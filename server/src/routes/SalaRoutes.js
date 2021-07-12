const express = require('express');
const SalaController = require('../app/controllers/SalaController');

const routes = express.Router();

routes.get('/sala', SalaController.index);
routes.get('/sala/:salaId', SalaController.show);
routes.post('/sala', SalaController.store);
routes.patch('/sala/:salaId', SalaController.update);
routes.delete('/sala/:salaId', SalaController.delete);

module.exports = routes;
