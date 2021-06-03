const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../../app');
const Todo = require('../../schema/Todo');

it('should return 400 if the body is not provided', async () => {
  const id = mongoose.Types.ObjectId();
  const res = await request(app).put(`/app/no_auth/todos/${id}`).send().expect(400);
  expect(res.body[0].error).toEqual('Title must be provided');
});

it('should return 400 if the ObjectID provided is not valid', async () => {
  const res = await request(app)
    .put('/app/no_auth/todos/adad')
    .send({ title: 'Hello' })
    .expect(400);
  expect(res.body[0].error).toEqual('Invalid ObjectID');
});

it('should return 404 if the todo is not found', async () => {
  const id = mongoose.Types.ObjectId();
  const res = await request(app)
    .put(`/app/no_auth/todos/${id}`)
    .send({ title: 'Hello' })
    .expect(404);
  expect(res.body[0].error).toEqual('Todo not found');
});

it('should return 200 if update the todo successfully ', async () => {
  const todo = await Todo.create({ title: 'Hello' });
  const res = await request(app)
    .put(`/app/no_auth/todos/${todo._id}`)
    .send({ title: 'Update Hello' })
    .expect(201);

  expect(res.body.success).toEqual(true);
  expect(res.body.data.title).toEqual('Update Hello');
});
