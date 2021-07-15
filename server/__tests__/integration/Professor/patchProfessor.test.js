const request = require('supertest');
const faker = require('faker');
const app = require('../../../src/app');
const truncate = require('../../utils/truncate');
const factory = require('../../factories');

beforeEach(async () => {
  await truncate();
});

describe('PATCH /api/professor', () => {
  it('should be able to patch a professor', async () => {
    const professor = await factory.create('Professor');

    const response = await request(app)
      .patch(`/api/professor/${professor.id}`)
      .send({
        nome: 'novo nome'
      });

    expect(response.status).toBe(200);
    expect(response.body.nome).toBe('novo nome');
  });

  it('should be able to associate a professor to a sala', async () => {
    const sala = await factory.create('Sala');
    const professor = await factory.create('Professor');

    const response = await request(app)
      .patch(`/api/professor/${professor.id}`)
      .send({
        id_sala: sala.id
      });

    expect(response.status).toBe(200);
    expect(response.body.sala.id).toBe(sala.id);
  });

  it('should not be able to patch a professor with an empty name', async () => {
    const professor = await factory.create('Professor');

    const response = await request(app)
      .patch(`/api/professor/${professor.id}`)
      .send({
        nome: ''
      });

    expect(response.status).toBe(400);
  });

  it('should not be able to patch a professor with a name larger than 150 characters', async () => {
    const professor = await factory.create('Professor');

    const response = await request(app)
      .patch(`/api/professor/${professor.id}`)
      .send({
        nome: faker.lorem.words(150),
      });

    expect(response.status).toBe(400);
  });

  it('should return 404 when trying to patch a professor that does not exists', async () => {
    const response = await request(app)
      .patch('/api/professor/3451');

    expect(response.status).toBe(404);
  });

  it('should return 404 when trying to associate a professor to a sala that does not exists', async () => {
    const professor = await factory.create('Professor');

    const response = await request(app)
      .patch(`/api/professor/${professor.id}`)
      .send({
        id_sala: 9999
      });

    expect(response.status).toBe(404);
  });
});
