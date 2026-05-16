import jwt from 'jsonwebtoken';
import InvariantError from '../exceptions/invariant-error.js';

const token_manager = {
  generatedAccessToken: (payload) => {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
  },
  generatedRefreshToken: (payload) => {
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
  },
  verifyRefreshToken: (refreshToken) => {
    try {
      const payload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
      return payload;
    } catch (err) {
      throw new InvariantError('Refresh token tidak valid');
    }
  },
  verifyAccessToken: (accessToken, secret) => {
    try {
      const payload = verify(accessToken, secret);
      return payload;
    } catch (err) {
      throw new InvariantError('Access token tidak valid');
    }
  },
};

export default token_manager;
