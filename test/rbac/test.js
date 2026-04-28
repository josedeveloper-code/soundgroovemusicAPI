const request = require('supertest');
const app = require('../../app');
const sequelize = require('../../database');

let listenerToken;

beforeAll(async () => {
  await sequelize.sync({ force: true });

  await request(app)
    .post('/auth/register')
    .send({
      username: 'rbac-listener',
      email: 'rbac-listener@groove.com',
      password: 'password123',
      role: 'listener'
    });

  const loginRes = await request(app)
    .post('/auth/login')
    .send({ email: 'rbac-listener@groove.com', password: 'password123' });

  listenerToken = loginRes.body.token;
});

afterAll(async () => {
  await sequelize.close();
});

describe('RBAC Permissions', () => {
  it('should block a listener from accessing admin routes', async () => {
    const res = await request(app)
      .get('/admin/users')
      .set('Authorization', `Bearer ${listenerToken}`);

    expect(res.statusCode).toEqual(403);
    expect(res.body.error).toMatch(/Forbidden/);
  });
});
