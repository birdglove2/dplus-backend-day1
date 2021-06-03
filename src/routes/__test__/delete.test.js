const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../../app');
const Todo = require('../../schema/Todo');

it('should return 400 if the ObjectID provided is not valid', async () => {
  const res = await request(app).delete('/app/no_auth/todos/adad').send().expect(400);
  expect(res.body[0].error).toEqual('Invalid ObjectID');
});

it('should return 404 if the todo is not found', async () => {
  const id = mongoose.Types.ObjectId();
  const res = await request(app).delete(`/app/no_auth/todos/${id}`).send().expect(404);
  expect(res.body[0].error).toEqual('Todo not found');
});

it('should return 203 if delete the todo successfully ', async () => {
  const todo = await Todo.create({ title: 'Hello' });
  const res = await request(app).delete(`/app/no_auth/todos/${todo._id}`).send().expect(202);
  expect(res.body.success).toEqual(true);

  const isTodoStillExist = await Todo.findById(todo._id);
  expect(isTodoStillExist).toBeNull();
});
