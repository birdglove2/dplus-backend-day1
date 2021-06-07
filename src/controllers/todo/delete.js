const { findTodo } = require('./helper');

const deleteTodo = async (req, res) => {
  const { _id } = req.params;

  const todo = await findTodo(_id);
  await todo.delete();

  const response = {
    success: true,
    data: {},
  };
  res.status(202).json(response);
};

module.exports = deleteTodo;
