const request = require('supertest');
const app = require('../../../src/app');
const truncate = require('../../utils/truncate');
const factory = require('../../factories');

beforeEach(async () => {
  await truncate();
});

describe('GET /api/sala', () => {
  it('should be able to get all salas', async () => {
    const names = ['sala1', 'sala2', 'sala3'];

    await Promise.all(names.map(async (nome_sala) => {
      await factory.create('Sala', {
        nome_sala
      });
    }));

    const response = await request(app)
      .get('/api/sala')
      .set('page', '');

    expect(response.body.salas).toHaveLength(names.length);
    expect(response.body.totalCount).toBe(names.length);
  });

  it('should be able to get a sala', async () => {
    const sala = await factory.create('Sala', {
      nome_sala: 'sala1'
    });

    const response = await request(app)
      .get(`/api/sala/${sala.id}`);

    expect(response.status).toBe(200);
    expect(response.body.nome_sala).toBe('sala1');
  });

  it('should be able to search a sala', async () => {
    const sala = await factory.create('Sala', {
      nome_sala: 'sala1'
    });

    const response = await request(app)
      .get('/api/sala/')
      .set('page', 0)
      .set('search', sala.nome_sala);

    expect(response.status).toBe(200);
    expect(response.body.salas[0].nome_sala).toBe('sala1');
  });

  it('should return 404 when trying to get a sala that does not exists', async () => {
    const response = await request(app)
      .get('/api/sala/3451');

    expect(response.status).toBe(404);
  });
});
