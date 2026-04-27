const request = require('supertest');
const app = require('../app');
const sequelize = require('../database');

// Before running tests, sync the database
beforeAll(async () => {
  await sequelize.sync({ force: true }); 
});

// Close connection after tests
afterAll(async () => {
  await sequelize.close();
});

describe('Auth Endpoints', () => {
  it('should register a new user successfully', async () => {
    const res = await request(app)
      .post('/auth/register')
      .send({
        username: 'testuser',
        email: 'test@groove.com',
        password: 'password123',
        role: 'listener'
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('userId');
  });

  it('should deny access to protected routes without a token', async () => {
    const res = await request(app).get('/profile');
    expect(res.statusCode).toEqual(401); // Unauthorized
  });
});