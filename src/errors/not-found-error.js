const CustomError = require('./custom-error');

class NotFoundError extends CustomError {
  statusCode = 404;
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

module.exports = NotFoundError;
