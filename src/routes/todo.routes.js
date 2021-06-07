const express = require('express');
const validateRequest = require('../middlewares/validate-request');

const { createTodoValidator } = require('../validators/todoValidator');

const router = express.Router();

const todoController = require('../controllers/todo/index');

// GET all todos
router.get('/todos', todoController.getMany);

// GET a todo
router.get('/todos/:_id', todoController.getSingle);

// POST todo data
router.post(
  '/todos',

  createTodoValidator,
  validateRequest,
  todoController.createTodo
);

// Update a todo
router.put('/todos/:_id', createTodoValidator, validateRequest, todoController.updateTodo);

// Delete a todo
router.delete('/todos/:_id', todoController.deleteTodo);

module.exports = router;
