const faker = require('faker');
const { factory } = require('factory-girl');
const { Sala, Professor, Aluno } = require('../src/app/models');

factory.define('Sala', Sala, {
  nome_sala: faker.random.word()
});

factory.define('Professor', Professor, {
  nome: faker.name.findName()
});

factory.define('Aluno', Aluno, {
  nome: faker.name.findName()
});

module.exports = factory;