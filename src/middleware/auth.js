import token_manager from '../security/token-manager.js';
import response from '../utils/response.js';

async function authenticationToken(req, res, next) {
  const token = req.headers.authorization;

  if (token && token.indexOf('Bearer ') !== -1) {
    try {
      const user = await token_manager.verifyAccessToken(token.split('Bearer ')[1]);
      req.user = user;
      return next();
    } catch (err) {
      response(res, err.statusCode || 401, err.message || 'Token tidak valid', null);
    }
  } else {
    response(res, 401, 'Token tidak valid', null);
  }
}

export default authenticationToken;
