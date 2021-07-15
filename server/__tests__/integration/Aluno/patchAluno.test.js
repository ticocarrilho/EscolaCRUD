const request = require('supertest');
const faker = require('faker');
const app = require('../../../src/app');
const truncate = require('../../utils/truncate');
const factory = require('../../factories');

beforeEach(async () => {
  await truncate();
});

describe('PATCH /api/aluno', () => {
  it('should be able to patch an aluno', async () => {
    const aluno = await factory.create('Aluno');

    const response = await request(app)
      .patch(`/api/aluno/${aluno.id}`)
      .send({
        nome: 'novo nome'
      });

    expect(response.status).toBe(200);
    expect(response.body.nome).toBe('novo nome');
  });

  it('should be able to associate an aluno to a professor', async () => {
    const aluno = await factory.create('Aluno');
    const professor = await factory.create('Professor');

    const response = await request(app)
      .patch(`/api/aluno/${aluno.id}`)
      .send({
        id_professor: professor.id
      });

    expect(response.status).toBe(200);
    expect(response.body.professor.id).toBe(professor.id);
  });

  it('should not be able to patch an aluno with an empty name', async () => {
    const aluno = await factory.create('Aluno');

    const response = await request(app)
      .patch(`/api/aluno/${aluno.id}`)
      .send({
        nome: ''
      });

    expect(response.status).toBe(400);
  });

  it('should not be able to patch an aluno with a name larger than 150 characters', async () => {
    const aluno = await factory.create('Aluno');

    const response = await request(app)
      .patch(`/api/aluno/${aluno.id}`)
      .send({
        nome: faker.lorem.words(150),
      });

    expect(response.status).toBe(400);
  });

  it('should return 404 when trying to patch an aluno that does not exists', async () => {
    const response = await request(app)
      .patch('/api/aluno/3451');

    expect(response.status).toBe(404);
  });

  it('should return 404 when trying to associate an aluno to a professor that does not exists', async () => {
    const aluno = await factory.create('Aluno');

    const response = await request(app)
      .patch(`/api/aluno/${aluno.id}`)
      .send({
        id_professor: 9999
      });

    expect(response.status).toBe(404);
  });
});
