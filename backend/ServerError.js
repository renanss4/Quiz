class ServerError extends Error {
  constructor({ message, statusCode, errorCode }) {
    super(message);
    this.statusCode = statusCode;
    this.errorCode = errorCode;
  }
}

export default ServerError;
