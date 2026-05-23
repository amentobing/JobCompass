import ClientError from './client-error.js';

class InvalidFileType extends ClientError {
  constructor(message) {
    super(message, 401);
    this.name = 'InvalidFileType';
  }
}

export default InvalidFileType;
