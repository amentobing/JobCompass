import { Router } from 'express';
import token_manager from '../security/token-manager.js';
import { deleteRefreshTokenByTokenAndUserId, getUserById, getUserResumes, updateUser } from '../utils/db.js';

const userRouter = Router();

userRouter.get('/token', async (req, res) => {
  const { token } = req.body;
  try {
    const payload = await token_manager.verifyRefreshToken(token);
    res.status(200).json({
      status: 'success',
      message: 'Token valid',
      data: {
        accessToken: token_manager.generatedAccessToken({ id: payload.id, email: payload.email, username: payload.username }),
      },
    });
  } catch (err) {
    res.status(err.statusCode || 401).json({
      status: 'fail',
      message: err.message || 'Token tidak valid',
    });
  }
});

userRouter.get('/profile', async (req, res) => {
  try {
    const user = await getUserById(req.user.id);

    if (!user) {
      return res.status(404).json({
        status: 'fail',
        message: 'Akun tidak ditemukan',
      });
    }

    const resumes = await getUserResumes(req.user.id);

    return res.status(200).json({
      status: 'success',
      message: 'Profil berhasil diambil',
      data: {
        user,
        resumes,
      },
    });
  } catch (err) {
    return res.status(500).json({
      status: 'fail',
      message: err.message || 'Terjadi kesalahan pada server',
    });
  }
});

userRouter.put('/profile', async (req, res) => {
  const { username } = req.body;

  if (!username || typeof username !== 'string' || username.trim() === '') {
    return res.status(400).json({
      status: 'fail',
      message: 'username harus diisi',
    });
  }

  const result = await updateUser({ id: req.user.id, username: username.trim() });

  if (result.status === 'fail') {
    return res.status(404).json({
      status: 'fail',
      message: result.message,
    });
  }

  return res.status(200).json({
    status: 'success',
    message: 'Username berhasil diperbarui',
    data: result.data,
  });
});

userRouter.post('/logout', async (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({
      status: 'fail',
      message: 'token harus diisi',
    });
  }

  const result = await deleteRefreshTokenByTokenAndUserId(token, req.user.id);

  if (!result.data.deleted) {
    return res.status(200).json({
      status: 'success',
      message: 'Logout berhasil',
      data: {
        deleted: false,
      },
    });
  }

  return res.status(200).json({
    status: 'success',
    message: 'Logout berhasil',
    data: {
      deleted: true,
    },
  });
});

export default userRouter;
