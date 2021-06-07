const request = require('supertest');
const app = require('../../../app');
const Todo = require('../../../schema/Todo');

it('should return 200 if get all todos successfully ', async () => {
  // if no todo return []
  const res1 = await request(app).get('/app/no_auth/todos').send().expect(200);
  expect(res1.body.success).toEqual(true);
  expect(res1.body.count).toBe(0);
  expect(res1.body.data.length).toBe(0);

  // if there is todo, return todo..
  const todo = await Todo.create({ title: 'Hello' });
  const res2 = await request(app).get('/app/no_auth/todos').send().expect(200);
  expect(res2.body.success).toEqual(true);
  expect(res2.body.count).toBe(1);
  expect(res2.body.data.length).toBe(1);
  expect(res2.body.data[0]._id).toEqual(todo._id.toHexString());
  expect(res2.body.data[0].title).toEqual(todo.title);
});
