const CustomError = require('./custom-error');

class BadRequestError extends CustomError {
  statusCode = 400;
  constructor(errorMessage) {
    super(errorMessage);
  }

  serializeErrors() {
    return [
      {
        error: this.errorMessage,
        data: {},
      },
    ];
  }
}

module.exports = BadRequestError;
