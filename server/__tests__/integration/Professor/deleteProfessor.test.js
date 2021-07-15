const request = require('supertest');
const app = require('../../../src/app');
const truncate = require('../../utils/truncate');
const factory = require('../../factories');

beforeEach(async () => {
  await truncate();
});

describe('DELETE /api/professor', () => {
  it('should be able to delete a professor', async () => {
    const professor = await factory.create('Professor');

    const response = await request(app)
      .delete(`/api/professor/${professor.id}`);

    expect(response.status).toBe(204);
  });

  it('should return 404 when trying to delete a professor that does not exists', async () => {
    const response = await request(app)
      .delete('/api/professor/3451');

    expect(response.status).toBe(404);
  });
});
