const request = require('supertest');
const faker = require('faker');
const app = require('../../../src/app');
const truncate = require('../../utils/truncate');
const factory = require('../../factories');

beforeEach(async () => {
  await truncate();
});

describe('POST /api/aluno', () => {
  it('should be able to create an aluno', async () => {
    const response = await request(app)
      .post('/api/aluno')
      .send({
        nome: 'aluno test',
      });

    expect(response.status).toBe(200);
  });

  it('should be able to create an aluno associated with a professor', async () => {
    const professor = await factory.create('Professor');

    const response = await request(app)
      .post('/api/aluno')
      .send({
        nome: 'aluno test',
        id_professor: professor.id,
      });

    expect(response.status).toBe(200);
    expect(response.body.professor.id).toBe(professor.id);
  });

  it('should not be able to create an aluno with an empty name', async () => {
    const response = await request(app)
      .post('/api/aluno')
      .send({
        nome: '',
      });

    expect(response.status).toBe(400);
  });

  it('should not be able to create an aluno without name parameter', async () => {
    const response = await request(app)
      .post('/api/aluno')
      .send();

    expect(response.status).toBe(400);
  });

  it('should not be able to create an aluno with a name larger than 150 characters', async () => {
    const response = await request(app)
      .post('/api/aluno')
      .send({
        nome: faker.lorem.words(150),
      });

    expect(response.status).toBe(400);
  });

  it('should return 404 when trying to create an aluno associated to a professor that does not exists', async () => {
    const response = await request(app)
      .post('/api/aluno')
      .send({
        nome: 'aluno test',
        id_professor: 9999,
      });

    expect(response.status).toBe(404);
  });
});
