const request = require('supertest');
const app = require('../../../src/app');
const truncate = require('../../utils/truncate');
const factory = require('../../factories');

beforeEach(async () => {
  await truncate();
});

describe('DELETE /api/sala', () => {
  it('should be able to delete a sala', async () => {
    const sala = await factory.create('Sala');

    const response = await request(app)
      .delete(`/api/sala/${sala.id}`);

    expect(response.status).toBe(204);
  });

  it('should return 404 when trying to delete a sala that does not exists', async () => {
    const response = await request(app)
      .delete('/api/sala/3451');

    expect(response.status).toBe(404);
  });
});
