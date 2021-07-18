const request = require('supertest');
const app = require('../../../src/app');
const truncate = require('../../utils/truncate');
const factory = require('../../factories');

beforeEach(async () => {
  await truncate();
});

describe('GET /api/aluno', () => {
  it('should be able to get all alunos', async () => {
    const names = ['aluno1', 'aluno2', 'aluno3'];

    await Promise.all(names.map(async (nome) => {
      await factory.create('Aluno', {
        nome
      });
    }));

    const response = await request(app)
      .get('/api/aluno')
      .set('page', '');

    expect(response.body.alunos).toHaveLength(names.length);
    expect(response.body.totalCount).toBe(names.length);
  });

  it('should be able to get an aluno', async () => {
    const aluno = await factory.create('Aluno', {
      nome: 'aluno1'
    });

    const response = await request(app)
      .get(`/api/aluno/${aluno.id}`);

    expect(response.status).toBe(200);
    expect(response.body.nome).toBe('aluno1');
  });

  it('should be able to search a aluno', async () => {
    const aluno = await factory.create('Aluno', {
      nome: 'aluno1'
    });

    const response = await request(app)
      .get('/api/aluno/')
      .set('page', 0)
      .set('search', aluno.nome);

    expect(response.status).toBe(200);
    expect(response.body.alunos[0].nome).toBe('aluno1');
  });

  it('should return 404 when trying to get an aluno that does not exists', async () => {
    const response = await request(app)
      .get('/api/aluno/3451');

    expect(response.status).toBe(404);
  });
});
