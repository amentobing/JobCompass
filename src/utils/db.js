import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../../prisma/generated/prisma/client.ts';
import bcrypt from 'bcrypt';
import { DBError } from '../exceptions/index.js';

const connectionString = process.env.DATABASE_URL;

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function createUser({ email, username, password }) {
  if (await prisma.user.findUnique({ where: { email } }))
    return {
      status: 'fail',
      message: 'Akun dengan Email ini sudah terdaftar, silahkan login',
    };

  const saltRounds = 12;
  const passHash = await bcrypt.hash(password, saltRounds);
  try {
    const user = await prisma.user.create({
      data: {
        email,
        username,
        password: passHash,
      },
    });
    return {
      status: 'success',
      data: { email, userId: user.id },
    };
  } catch (err) {
    console.error(err);
    throw new DBError('Terjadi kesalahan pada server');
  }
}

async function loginUser({ email, password }) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user)
      return {
        status: 'fail',
        message: 'Email tidak ditemukan',
      };

    const comparePass = await bcrypt.compareSync(password, user.password);

    if (comparePass) {
      return {
        status: 'success',
        data: {
          username: user.username,
          userId: user.id,
        },
      };
    } else {
      return {
        status: 'fail',
        message: 'Password salah',
      };
    }
  } catch (error) {
    console.error(error);
    throw new DBError('Terjadi kesalahan pada server');
  }
}

export { createUser, loginUser };
