const express = require('express');
const ProfessorController = require('../app/controllers/ProfessorController');
const { professorRequiredFieldsPatch, professorRequiredFieldsPost } = require('./validations/professorValidations');
const { returnValidation } = require('../middlewares/validation');

const routes = express.Router();

routes.get('/professor', ProfessorController.index);
routes.get('/professor/:id', ProfessorController.show);
routes.post('/professor', professorRequiredFieldsPost, returnValidation, ProfessorController.store);
routes.patch('/professor/:id', professorRequiredFieldsPatch, returnValidation, ProfessorController.update);
routes.delete('/professor/:id', ProfessorController.delete);

module.exports = routes;
