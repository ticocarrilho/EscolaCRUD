const express = require('express');
const AlunoController = require('../app/controllers/AlunoController');
const { alunoRequiredFieldsPatch, alunoRequiredFieldsPost } = require('./validations/alunoValidations');
const { returnValidation } = require('../middlewares/validation');

const routes = express.Router();

routes.get('/aluno', AlunoController.index);
routes.get('/aluno/:id', AlunoController.show);
routes.post('/aluno', alunoRequiredFieldsPost, returnValidation, AlunoController.store);
routes.patch('/aluno/:id', alunoRequiredFieldsPatch, returnValidation, AlunoController.update);
routes.delete('/aluno/:id', AlunoController.delete);

module.exports = routes;
