const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../../app');
const Todo = require('../../schema/Todo');

it('should return 400 if the ObjectID provided is not valid', async () => {
  await request(app).get('/app/no_auth/todos/adad').send().expect(400);
});

it('should return 404 if the todo is not found', async () => {
  const id = mongoose.Types.ObjectId();
  await request(app).get(`/app/no_auth/todos/${id}`).send().expect(404);
});

it('should return 200 if get the todo successfully ', async () => {
  const todo = await Todo.create({ title: 'Hello' });
  const res = await request(app).get(`/app/no_auth/todos/${todo._id}`).send().expect(200);
  expect(res.body.success).toEqual(true);
  expect(res.body.data.title).toEqual(todo.title);
});
