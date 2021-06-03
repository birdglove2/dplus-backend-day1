class CustomError {
  constructor(errorMessage) {
    this.errorMessage = errorMessage;
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

module.exports = CustomError;
