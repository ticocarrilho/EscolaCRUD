const request = require('supertest');
const faker = require('faker');
const app = require('../../../src/app');
const truncate = require('../../utils/truncate');
const factory = require('../../factories');

beforeEach(async () => {
  await truncate();
});

describe('PATCH /api/sala', () => {
  it('should be able to patch a sala', async () => {
    const sala = await factory.create('Sala');

    const response = await request(app)
      .patch(`/api/sala/${sala.id}`)
      .send({
        nome_sala: 'novasala'
      });

    expect(response.status).toBe(200);
    expect(response.body.nome_sala).toBe('novasala');
  });

  it('should not be able to patch a sala with an empty name', async () => {
    const sala = await factory.create('Sala');

    const response = await request(app)
      .patch(`/api/sala/${sala.id}`)
      .send({
        nome_sala: ''
      });

    expect(response.status).toBe(400);
  });

  it('should not be able to patch a sala with a name larger than 150 characters', async () => {
    const sala = await factory.create('Sala');

    const response = await request(app)
      .patch(`/api/sala/${sala.id}`)
      .send({
        nome_sala: faker.lorem.words(150),
      });

    expect(response.status).toBe(400);
  });

  it('should return 404 when trying to patch a sala that does not exists', async () => {
    const response = await request(app)
      .patch('/api/sala/3451');

    expect(response.status).toBe(404);
  });
});
