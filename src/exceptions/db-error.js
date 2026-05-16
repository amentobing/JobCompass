import ClientError from './client-error.js';

class DBError extends ClientError {
  constructor(message) {
    super(message, 500);
    this.name = 'DBError';
  }
}

export default DBError;
