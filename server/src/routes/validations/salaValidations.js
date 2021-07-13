const { body } = require('express-validator');

const NAME_EMPTY = 'O campo de Nome não pode estar vazio.';

module.exports = {
  salaRequiredFieldsPost: [
    body('nome_sala').trim().notEmpty().withMessage(NAME_EMPTY),
  ],
  
  salaRequiredFieldsPatch: [
    body('nome_sala').optional().trim().notEmpty().withMessage(NAME_EMPTY),
  ],
};
