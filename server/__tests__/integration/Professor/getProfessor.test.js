const request = require('supertest');
const app = require('../../../src/app');
const truncate = require('../../utils/truncate');
const factory = require('../../factories');

beforeEach(async () => {
  await truncate();
});

describe('GET /api/professor', () => {
  it('should be able to get all professors', async () => {
    const names = ['professor1', 'professor2', 'professor3'];

    await Promise.all(names.map(async (nome) => {
      await factory.create('Professor', {
        nome
      });
    }));

    const response = await request(app)
      .get('/api/professor')
      .set('page', '');

      expect(response.body.professores).toHaveLength(names.length);
      expect(response.body.totalCount).toBe(names.length);
  });

  it('should be able to get a professor', async () => {
    const professor = await factory.create('Professor', {
      nome: 'professor1'
    });

    const response = await request(app)
      .get(`/api/professor/${professor.id}`);

    expect(response.status).toBe(200);
    expect(response.body.nome).toBe('professor1');
  });

  it('should be able to search a professor', async () => {
    const professor = await factory.create('Professor', {
      nome: 'prof1'
    });

    const response = await request(app)
      .get('/api/professor/')
      .set('page', 0)
      .set('search', professor.nome);

    expect(response.status).toBe(200);
    expect(response.body.professores[0].nome).toBe('prof1');
  });

  it('should return 404 when trying to get a professor that does not exists', async () => {
    const response = await request(app)
      .get('/api/professor/3451');

    expect(response.status).toBe(404);
  });
});
