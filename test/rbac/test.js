describe('RBAC Permissions', () => {
  let listenerToken;

  beforeAll(async () => {
    // 1. Log in as a listener to get a token
    const loginRes = await request(app)
      .post('/auth/login')
      .send({ email: 'test@groove.com', password: 'password123' });
    listenerToken = loginRes.body.token;
  });

  it('should block a listener from accessing admin routes', async () => {
    const res = await request(app)
      .get('/admin')
      .set('Authorization', `Bearer ${listenerToken}`);
    
    expect(res.statusCode).toEqual(403); // Forbidden
    expect(res.body.message).toMatch(/Admins only/);
  });
});