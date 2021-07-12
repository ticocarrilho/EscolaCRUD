const express = require('express');
const ProfessorController = require('../app/controllers/ProfessorController');

const routes = express.Router();

routes.get('/professor', ProfessorController.index);
routes.get('/professor/:professorId', ProfessorController.show);
routes.post('/professor', ProfessorController.store);
routes.patch('/professor/:professorId', ProfessorController.update);
routes.delete('/professor/:professorId', ProfessorController.delete);

module.exports = routes;
