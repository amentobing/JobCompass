import token_manager from '../security/token-manager.js';
import response from '../utils/response.js';

async function authenticationToken(req, res, next) {
  const accessToken = req.headers.authorization;

  if (accessToken && accessToken.indexOf('Bearer ') !== -1) {
    const token = accessToken.split('Bearer ')[1];
    try {
      const user = await token_manager.verifyAccessToken(token, process.env.ACCESS_TOKEN_SECRET);
      req.user = user;
      return next();
    } catch (err) {
      response(res, err.statusCode || 401, err.message || 'Tidak dapat memverifikasi token', null);
    }
  } else {
    response(res, 401, 'Tidak dapat memverifikasi token', null);
  }
}

export default authenticationToken;
