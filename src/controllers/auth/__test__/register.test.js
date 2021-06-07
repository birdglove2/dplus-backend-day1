const request = require('supertest');
const app = require('../../../app');

it('should return 201 on a successful signup', async () => {
  return request(app)
    .post('/app/auth/register')
    .send({ name: 'test-user', email: 'test@test.com', password: 'password' })
    .expect(201);
});

it('should return 400 if name is not provided', async () => {
  await request(app)
    .post('/app/auth/register')
    .send({ email: '', password: 'password' })
    .expect(400);
});

it('should return 400 if email is invalid', async () => {
  await request(app)
    .post('/app/auth/register')
    .send({ name: 'test-user', email: '', password: 'password' })
    .expect(400);

  await request(app)
    .post('/app/auth/register')
    .send({ name: 'test-user', email: 'asdf', password: 'password' })
    .expect(400);
});

it('should return 400 if password is invalid', async () => {
  await request(app)
    .post('/app/auth/register')
    .send({ name: 'test-user', email: 'test@test.com', password: '' })
    .expect(400);

  await request(app)
    .post('/app/auth/register')
    .send({ name: 'test-user', email: 'test@test.com', password: 'p' })
    .expect(400);
});

it('should return 400 if name, email, password, or all of them are missing', async () => {
  await request(app).post('/app/auth/register').send({ name: 'test-user' }).expect(400);

  await request(app)
    .post('/app/auth/register')
    .send({ name: 'test-user', email: 'test@test.com' })
    .expect(400);

  await request(app)
    .post('/app/auth/register')
    .send({ email: 'test@test.com', password: 'password' })
    .expect(400);

  await request(app)
    .post('/app/auth/register')
    .send({ name: 'test-user', password: 'password' })
    .expect(400);

  await request(app).post('/app/auth/register').send({}).expect(400);
});

it('should disallow duplicate emails', async () => {
  await request(app)
    .post('/app/auth/register')
    .send({ name: 'test-user', email: 'test@test.com', password: 'password' })
    .expect(201);

  await request(app)
    .post('/app/auth/register')
    .send({ name: 'test-user2', email: 'test@test.com', password: 'password' })
    .expect(400);
});

it('should disallow duplicate names', async () => {
  await request(app)
    .post('/app/auth/register')
    .send({ name: 'test-user', email: 'test@test.com', password: 'password' })
    .expect(201);

  await request(app)
    .post('/app/auth/register')
    .send({ name: 'test-user', email: 'test2@test.com', password: 'password' })
    .expect(400);
});
