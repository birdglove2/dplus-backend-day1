const { body } = require('express-validator');

exports.createTodoValidator = body('title').notEmpty().withMessage('Title must be provided');
