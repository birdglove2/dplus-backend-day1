const { findTodo } = require('./helper');

const getSingle = async (req, res) => {
  const { _id } = req.params;

  const todo = await findTodo(_id);

  const response = {
    success: true,
    data: {
      order: todo.order,
      title: todo.title,
      createdAt: todo.createdAt,
      _id: todo._id,
    },
  };
  res.status(200).json(response);
};

module.exports = getSingle;
