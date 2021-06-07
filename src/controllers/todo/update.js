const { findTodo } = require('./helper');

const updateTodo = async (req, res) => {
  const { _id } = req.params;

  const todo = await findTodo(_id);

  const { title } = req.body;
  todo.title = title;
  await todo.save();

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

module.exports = updateTodo;
