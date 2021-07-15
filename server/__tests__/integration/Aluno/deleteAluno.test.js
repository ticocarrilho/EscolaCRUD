const request = require('supertest');
const app = require('../../../src/app');
const truncate = require('../../utils/truncate');
const factory = require('../../factories');

beforeEach(async () => {
  await truncate();
});

describe('DELETE /api/aluno', () => {
  it('should be able to delete an aluno', async () => {
    const aluno = await factory.create('Aluno');

    const response = await request(app)
      .delete(`/api/aluno/${aluno.id}`);

    expect(response.status).toBe(204);
  });

  it('should return 404 when trying to delete an aluno that does not exists', async () => {
    const response = await request(app)
      .delete('/api/aluno/3451');

    expect(response.status).toBe(404);
  });
});
