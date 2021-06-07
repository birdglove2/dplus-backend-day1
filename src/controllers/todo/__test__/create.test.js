const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../../../app');
const Todo = require('../../../schema/Todo');

it('should return 400 if the body is not provided', async () => {
  const res = await request(app).post('/app/no_auth/todos/').send().expect(400);
  expect(res.body[0].error).toEqual('Title must be provided');
});

it('should return 200 if create the todo successfully ', async () => {
  var todo = await Todo.find({});
  expect(todo.length).toBe(0);

  await request(app).post(`/app/no_auth/todos`).send({ title: 'Hello' }).expect(201);

  todo = await Todo.find({});
  expect(todo.length).toBe(1);
});
