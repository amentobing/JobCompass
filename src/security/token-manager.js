import jwt from 'jsonwebtoken';
import InvariantError from '../exceptions/invariant-error.js';
import { removeExpiredRefreshToken } from '../utils/db.js';

const requireSecret = (secret, name) => {
  if (!secret) {
    throw new Error(`${name} tidak ditemukan. Tambahkan ${name} di file .env atau environment Anda.`);
  }
  return secret;
};

const token_manager = {
  generatedAccessToken: (payload) => {
    const secret = requireSecret(process.env.ACCESS_TOKEN_SECRET, 'ACCESS_TOKEN_SECRET');
    return jwt.sign(payload, secret, { expiresIn: '15m' });
  },
  generatedRefreshToken: (payload) => {
    const secret = requireSecret(process.env.REFRESH_TOKEN_SECRET, 'REFRESH_TOKEN_SECRET');
    return jwt.sign(payload, secret, { expiresIn: '7d' });
  },
  verifyRefreshToken: async (refreshToken) => {
    try {
      const secret = requireSecret(process.env.REFRESH_TOKEN_SECRET, 'REFRESH_TOKEN_SECRET');
      const payload = jwt.verify(refreshToken, secret);
      return payload;
    } catch (err) {
      if (err.name === 'TokenExpiredError') {
        await removeExpiredRefreshToken(refreshToken);
        throw new InvariantError('Refresh token sudah kadaluarsa');
      }
      throw new InvariantError('Refresh token tidak valid');
    }
  },
  verifyAccessToken: (accessToken, secret) => {
    try {
      const verifiedSecret = requireSecret(secret, 'ACCESS_TOKEN_SECRET');
      const payload = jwt.verify(accessToken, verifiedSecret);
      return payload;
    } catch (err) {
      throw new InvariantError('Access token tidak valid');
    }
  },
};

export default token_manager;
