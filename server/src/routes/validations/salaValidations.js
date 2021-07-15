const { body } = require('express-validator');

const NAME_EMPTY = 'O campo de Nome não pode estar vazio.';
const NAME_LENGTH = 'O campo de Nome não pode ter mais de 150 caracteres.';

module.exports = {
  salaRequiredFieldsPost: [
    body('nome_sala')
      .trim().notEmpty().withMessage(NAME_EMPTY)
      .bail().isLength({ max: 150 }).withMessage(NAME_LENGTH),
  ],
  
  salaRequiredFieldsPatch: [
    body('nome_sala')
      .optional().trim().notEmpty().withMessage(NAME_EMPTY)
      .bail().isLength({ max: 150 }).withMessage(NAME_LENGTH),
  ],
};
