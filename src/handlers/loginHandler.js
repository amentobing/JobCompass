import Joi from 'joi';
import { loginUser } from '../utils/db.js';
import { loginSchema } from '../validator/schema.js';
import token_manager from '../security/token-manager.js';

export default async function loginHandler(req, res) {
  const { email, password } = req.body;

  const result = await loginUser({ email, password });

  if (result.status == 'fail')
    return res.status(400).json({
      status: 'fail',
      message: result.message,
      data: { email },
    });

  return res.status(200).json({
    status: 'success',
    message: 'Berhasil login',
    data: { accessToken: token_manager.generatedAccessToken(result.data), refreshToken: token_manager.generatedRefreshToken(result.data) },
  });
}
