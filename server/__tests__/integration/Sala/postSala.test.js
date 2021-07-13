const request = require('supertest');
const app = require('../../../src/app');
const truncate = require('../../utils/truncate');

beforeEach(async () => {
  await truncate();
});

describe('POST /api/sala', () => {
  it('should be able to create a sala', async () => {
    const response = await request(app)
      .post('/api/sala')
      .send({
        nome_sala: 'sala test',
      });

    expect(response.status).toBe(200);
  });

  it('should not be able to create a sala with an empty name', async () => {
    const response = await request(app)
      .post('/api/sala')
      .send({
        nome_sala: '',
      });

    expect(response.status).toBe(400);
  });

  it('should not be able to create a sala without name parameter', async () => {
    const response = await request(app)
      .post('/api/sala')
      .send();

    expect(response.status).toBe(400);
  });
});
