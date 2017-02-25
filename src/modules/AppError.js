class AppError extends Error {
  constructor(status, data, message) {
    super(message || status);
    this.status = status;
    this.message = message;
    this.type = 'error';
    this.data = data;
  }
}

module.exports = AppError;
