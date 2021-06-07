const request = require('supertest');
const app = require('../../../app');

it('should return 201 on a successful signin', async () => {
  await request(app)
    .post('/app/auth/register')
    .send({ name: 'test-user', email: 'test@test.com', password: 'password' })
    .expect(201);

  await request(app)
    .post('/app/auth/login')
    .send({ email: 'test@test.com', password: 'password' })
    .expect(200);
});

it('should return 400 if email does not exist or invalid', async () => {
  await request(app).post('/app/auth/login').send({ email: '', password: 'password' }).expect(400);

  await request(app)
    .post('/app/auth/login')
    .send({ email: 'asdf', password: 'password' })
    .expect(400);

  await request(app)
    .post('/app/auth/login')
    .send({ email: 'test@test.com', password: 'password' })
    .expect(404);
});

it('should return 400 if password does not match with the email', async () => {
  await request(app)
    .post('/app/auth/register')
    .send({ name: 'test-user', email: 'test@test.com', password: 'password' })
    .expect(201);

  await request(app)
    .post('/app/auth/login')
    .send({ email: 'test@test.com', password: 'unmatchedPassword' })
    .expect(400);
});

it('should return 400 if email, password, or both are missing', async () => {
  await request(app)
    .post('/app/auth/register')
    .send({ name: 'test-user', email: 'test@test.com', password: 'password' })
    .expect(201);

  await request(app).post('/app/auth/login').send({ email: 'test@test.com' }).expect(400);

  await request(app).post('/app/auth/login').send({ password: 'password' }).expect(400);

  await request(app).post('/app/auth/login').send({}).expect(400);
});

it('should set a cookie after successful sigin', async () => {
  await request(app)
    .post('/app/auth/register')
    .send({ name: 'test-user', email: 'test@test.com', password: 'password' })
    .expect(201);

  const res = await request(app)
    .post('/app/auth/login')
    .send({ email: 'test@test.com', password: 'password' })
    .expect(200);

  expect(res.get('Set-Cookie')).toBeDefined();
});
