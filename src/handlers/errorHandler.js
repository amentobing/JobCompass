import response from '../utils/response.js';
import { ClientError } from '../exceptions/index.js';

const errorHandler = (err, req, res, next) => {
  const body = req.body ? (({ password, confirmPass, ...rest }) => rest)(req.body) : null;
  if (err instanceof ClientError) {
    if (err.statusCode >= 500) {
      console.error(err);
    }
    return response(res, err.statusCode, err.message, body);
  }

  if (err.isJoi) {
    return response(res, 400, err.details[0].message, body);
  }

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  console.error(err);

  return response(res, statusCode, message, null);
};

export default errorHandler;
