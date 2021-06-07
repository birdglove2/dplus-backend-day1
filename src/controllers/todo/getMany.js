const Todo = require('../../schema/Todo');

const getMany = async (req, res) => {
  const { select, sort, order, title } = req.query;
  const projection = select ? { [select]: 1 } : {};
  const option = sort ? { sort: { [sort]: 1 } } : {};

  let filter = {};
  if (order) {
    const key = Object.keys(order)[0];
    const value = Object.values(order)[0];
    const ascOrDes = '$' + key;
    filter = { order: { [ascOrDes]: value } };
  }

  let todos;
  if (title) {
    todos = await Todo.find(filter, projection, option).where({ title });
  } else {
    todos = await Todo.find(filter, projection, option);
  }

  const response = {
    success: true,
    count: todos.length,
    data: todos,
  };
  res.status(200).json(response);
};

module.exports = getMany;
