const request = require('supertest');
const app = require('../../../app');

it('should clear the cookie after signing out', async () => {
  await request(app)
    .post('/app/auth/register')
    .send({ name: 'test-user', email: 'test@test.com', password: 'password' })
    .expect(201);

  const res1 = await request(app)
    .post('/app/auth/login')
    .send({ email: 'test@test.com', password: 'password' })
    .expect(200);
  expect(res1.get('Set-Cookie')).toBeDefined();

  const res2 = await request(app)
    .post('/app/auth/logout')
    .set('Cookie', res1.get('Set-Cookie'))
    .send({})
    .expect(200);

  expect(res2.get('Set-Cookie')[0]).toEqual(
    'token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT'
  );
});
