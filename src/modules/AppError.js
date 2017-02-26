class AppError extends Error {
  constructor(status, data, message) {
    super(message || status);
    this.status = status;
    this.message = message;
    this.data = data || {};
  }
}

module.exports = AppError;
