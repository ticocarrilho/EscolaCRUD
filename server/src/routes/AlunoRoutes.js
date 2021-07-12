const express = require('express');
const AlunoController = require('../app/controllers/AlunoController');

const routes = express.Router();

routes.get('/aluno', AlunoController.index);
routes.get('/aluno/:alunoId', AlunoController.show);
routes.post('/aluno', AlunoController.store);
routes.patch('/aluno/:alunoId', AlunoController.update);
routes.delete('/aluno/:alunoId', AlunoController.delete);

module.exports = routes;
