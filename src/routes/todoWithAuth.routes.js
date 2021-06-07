const express = require('express');
const validateRequest = require('../middlewares/validate-request');

const currentUser = require('../middlewares/current-user');
const requireAuth = require('../middlewares/require-auth');
const { createTodoValidator } = require('../validators/todoValidator');

const router = express.Router();

const todoController = require('../controllers/todo/index');

// POST todo data
router.post(
  '/todos',
  currentUser,
  requireAuth,
  createTodoValidator,
  validateRequest,
  todoController.createTodo
);

// Update a todo
router.put(
  '/todos/:_id',
  currentUser,
  requireAuth,
  createTodoValidator,
  validateRequest,
  todoController.updateTodo
);

// Delete a todo
router.delete('/todos/:_id', currentUser, requireAuth, todoController.deleteTodo);
