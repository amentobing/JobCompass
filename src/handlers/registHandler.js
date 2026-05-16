import Joi from 'joi';
import { createUser } from '../utils/db.js';

export default async function registHandler(req, res) {
  const data = req.body;

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
}
