const Todo = require('../../schema/Todo');
const { createOrder } = require('./helper');

const createTodo = async (req, res) => {
  const { title } = req.body;

  const order = await createOrder();
  const todo = await Todo.create({ title, order });
  const response = {
    success: true,
    data: {
      order: todo.order,
      title: todo.title,
      createdAt: todo.createdAt,
      _id: todo._id,
    },
  };
  res.status(201).json(response);
};

module.exports = createTodo;
