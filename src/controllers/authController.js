import { loginUser, createUser } from '../utils/db.js';
import token_manager from '../security/token-manager.js';

export async function loginHandler(req, res, next) {
  try {
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
  } catch (err) {
    next(err);
  }
}

export async function registHandler(req, res, next) {
  try {
    const data = req.validated || req.body;

    const result = await createUser(data);

    if (result.status == 'fail')
      return res.status(400).json({
        status: 'fail',
        message: result.message,
      });

    return res.status(201).json({
      status: 'success',
      message: 'User telah ditambahkan, silahkan login menggunakan username dan password yang terdaftar',
      data: { email: result.data.email, userId: result.data.userId },
    });
  } catch (err) {
    next(err);
  }
}
