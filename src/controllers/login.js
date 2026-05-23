import { loginUser } from '../utils/db.js';
import token_manager from '../security/token-manager.js';

export default async function loginHandler(req, res) {
  const { email, password } = req.validated || req.body;

  const result = await loginUser({ email, password });

  if (result.status == 'fail')
    return res.status(400).json({
      status: 'fail',
      message: result.message,
      data: { email },
    });

  const { refreshToken, ...userData } = result.data;

  return res.status(200).json({
    status: 'success',
    message: 'Berhasil login',
    data: { accessToken: token_manager.generatedAccessToken({ ...userData }), refreshToken },
  });
}
