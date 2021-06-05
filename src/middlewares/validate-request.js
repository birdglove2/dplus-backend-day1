const { validationResult } = require('express-validator');
const RequestValidationError = require('../errors/request-validate-error');

const validateRequest = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const err = new RequestValidationError(errors.array());
    next(err);
  }

  next();
};

module.exports = validateRequest;
