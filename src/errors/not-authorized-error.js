const CustomError = require('./custom-error');

class NotAuthorizedError extends CustomError {
  statusCode = 401;
  constructor() {
    super('Unauthorized');
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

module.exports = NotAuthorizedError;
