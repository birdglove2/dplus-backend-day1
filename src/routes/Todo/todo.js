const express = require('express');
const { body } = require('express-validator');
const validateRequest = require('../../middlewares/validate-request');

const bodyChecker = body('title').notEmpty().withMessage('Title must be provided');

const Todo = require('../../schema/Todo');

const router = express.Router();

const { createOrder, findTodo } = require('./helper');

// GET all todos
router.get('/todos', async (req, res, next) => {
  const { select, sort, order } = req.query;

  const projection = select ? { [select]: 1 } : {};
  const option = sort ? { sort: { [sort]: 1 } } : {};

  let filter = {};
  if (order) {
    const key = Object.keys(order)[0];
    const value = Object.values(order)[0];
    const ascOrDes = '$' + key;
    filter = { order: { [ascOrDes]: value } };
  }

  try {
    const todos = await Todo.find(filter, projection, option);

    const response = {
      success: true,
      count: todos.length,
      data: todos,
    };
    res.status(200).json(response);
  } catch (err) {
    next(err);
  }
});

// POST todo data
router.post('/todos', bodyChecker, validateRequest, async (req, res, next) => {
  const { title } = req.body;
  try {
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
  } catch (err) {
    next(err);
  }
});

// GET a todo
router.get('/todos/:_id', async (req, res, next) => {
  const { _id } = req.params;

  try {
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
  } catch (err) {
    next(err);
  }
});

// Update a todo
router.put('/todos/:_id', bodyChecker, validateRequest, async (req, res, next) => {
  const { _id } = req.params;
  try {
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
  } catch (err) {
    next(err);
  }
});

// Delete a todo
router.delete('/todos/:_id', async (req, res, next) => {
  const { _id } = req.params;
  try {
    const todo = await findTodo(_id);
    await todo.delete();

    const response = {
      success: true,
      data: {},
    };
    res.status(202).json(response);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
