const mongoose = require('mongoose');
const { NotFoundError, BadRequestError } = require('../../errors/index');
const Todo = require('../../schema/Todo');

const createOrder = async () => {
  const todos = await Todo.find({}).sort({ createdAt: 1 });
  return todos.length + 1;
};

const findTodo = async (_id) => {
  if (!mongoose.isValidObjectId(_id)) {
    throw new BadRequestError('Invalid ObjectID');
  }

  const todo = await Todo.findById(_id);
  if (!todo) {
    throw new NotFoundError('Todo not found');
  }
  return todo;
};

module.exports = { createOrder, findTodo };
