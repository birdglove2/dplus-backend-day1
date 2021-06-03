const CustomError = require('../errors/custom-error');

const errorHandler = (err, req, res, next) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json(err.serializeErrors());
  }

  res.status(400).send([
    {
      error: `Something went wrong: ${err.message}`,
      data: {},
    },
  ]);
};

module.exports = errorHandler;
