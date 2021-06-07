const { body } = require('express-validator');

exports.registerValidator = [
  body('name').notEmpty().withMessage('Name must be provided'),
  body('email').notEmpty().withMessage('Email must be provided'),
  body('password').trim().notEmpty().withMessage('Password must be provided'),
  body('password')
    .isLength({ min: 4, max: 20 })
    .withMessage('Password must be between 4 and 20 characters.'),
  body('email').isEmail().withMessage('Email must be valid.'),
];

exports.loginValidator = [
  body('email').notEmpty().withMessage('Email must be provided'),
  body('password').trim().notEmpty().withMessage('Password must be provided'),
  body('email').isEmail().withMessage('Email must be valid.'),
];
