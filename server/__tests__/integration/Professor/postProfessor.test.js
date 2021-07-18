const request = require('supertest');
const faker = require('faker');
const app = require('../../../src/app');
const truncate = require('../../utils/truncate');
const factory = require('../../factories');

beforeEach(async () => {
  await truncate();
});

describe('POST /api/professor', () => {
  it('should be able to create a professor', async () => {
    const response = await request(app)
      .post('/api/professor')
      .send({
        nome: 'professor test',
      });

    expect(response.status).toBe(200);
  });

  it('should be able to create a professor associated with a sala', async () => {
    const sala = await factory.create('Sala');

    const response = await request(app)
      .post('/api/professor')
      .send({
        nome: 'professor test',
        sala: sala.id,
      });

    expect(response.status).toBe(200);
    expect(response.body.sala.id).toBe(sala.id);
  });

  it('should not be able to create a professor with an empty name', async () => {
    const response = await request(app)
      .post('/api/professor')
      .send({
        nome: '',
      });

    expect(response.status).toBe(400);
  });

  it('should not be able to create a professor without name parameter', async () => {
    const response = await request(app)
      .post('/api/professor')
      .send();

    expect(response.status).toBe(400);
  });

  it('should not be able to create a professor with a name larger than 150 characters', async () => {
    const response = await request(app)
      .post('/api/professor')
      .send({
        nome: faker.lorem.words(150),
      });

    expect(response.status).toBe(400);
  });

  it('should return 404 when trying to create a professor associated to a sala that does not exists', async () => {
    const response = await request(app)
      .post('/api/professor')
      .send({
        nome: 'professor test',
        sala: 9999,
      });

    expect(response.status).toBe(404);
  });
});
