const express = require('express');
const SalaController = require('../app/controllers/SalaController');
const { salaRequiredFieldsPatch, salaRequiredFieldsPost } = require('./validations/salaValidations');
const { returnValidation } = require('../middlewares/validation');

const routes = express.Router();

routes.get('/sala', SalaController.index);
routes.get('/sala/:id', SalaController.show);
routes.post('/sala', salaRequiredFieldsPost, returnValidation, SalaController.store);
routes.patch('/sala/:id', salaRequiredFieldsPatch, returnValidation, SalaController.update);
routes.delete('/sala/:id', SalaController.delete);

module.exports = routes;
