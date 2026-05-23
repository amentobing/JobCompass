import 'dotenv/config';
// import { PrismaPg } from '@prisma/adapter-pg';
// import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import bcrypt from 'bcrypt';
import { DBError } from '../exceptions/index.js';
import token_manager from '../security/token-manager.js';
import { nanoid } from 'nanoid';

// const connectionString = process.env.DATABASE_URL;
// if (!connectionString) {
//   throw new Error('DATABASE_URL tidak ditemukan. Tambahkan DATABASE_URL di file .env atau environment Anda.');
// }
// const adapter = new PrismaPg({ connectionString });
// const prisma = new PrismaClient({ adapter });

const pool = new Pool();

// # UNTUK VALIDASI SAJA
async function searchData(key, value) {
  const query = {
    text: `SELECT * FROM users WHERE ${key}=$1`,
    values: [value],
  };
  return (await pool.query(query)).rows[0];
}

async function createUser({ email, username, password }) {
  // # PRISMA
  // if (await prisma.user.findUnique({ where: { email } }))
  //   return {
  //     status: 'fail',
  //     message: 'Akun dengan Email ini sudah terdaftar',
  //   };

  if (await searchData('email', email))
    return {
      status: 'fail',
      message: 'Akun dengan Email ini sudah terdaftar',
    };

  const saltRounds = 12;
  const passHash = await bcrypt.hash(password, saltRounds);

  try {
    // # PRISMA
    // const user = await prisma.user.create({
    //   data: {
    //     email,
    //     username,
    //     password: passHash,
    //   },
    // });

    // # QUERY MANUAL
    const id = nanoid(8);
    const query = {
      text: 'INSERT INTO users (id, email, username, password) VALUES ($1, $2, $3, $4) RETURNING *',
      values: [id, email, username, passHash],
    };
    const result = (await pool.query(query)).rows[0];

    // # PRISMA
    // return {
    //   status: 'success',
    //   data: { email, userId: user.id },
    // };

    return {
      status: 'success',
      data: { email: result.email, userId: result.id },
    };
  } catch (err) {
    console.error(err);
    throw new DBError('Terjadi kesalahan pada Database');
  }
}

async function saveResume({ userId, filename, parsedText }) {
  try {
    const id = nanoid(8);
    const query = {
      text: 'INSERT INTO resumes (id, "userId", filename, "parsedText") VALUES ($1, $2, $3, $4) RETURNING *',
      values: [id, userId, filename, parsedText],
    };

    const result = (await pool.query(query)).rows[0];

    return {
      status: 'success',
      data: {
        id: result.id,
        userId: result.userId,
        filename: result.filename,
        parsedText: result.parsedText,
        upload_at: result.upload_at,
      },
    };
  } catch (err) {
    console.error(err);
    throw new DBError('Terjadi kesalahan pada Database');
  }
}

async function saveJob({ resumeId, title, description, company, url }) {
  try {
    const id = nanoid(8);
    const query = {
      text: 'INSERT INTO jobs (id, "resumeId", title, description, company, url) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      values: [id, resumeId, title, description, company, url],
    };

    const result = (await pool.query(query)).rows[0];

    return {
      status: 'success',
      data: {
        id: result.id,
        resumeId: result.resumeId,
        title: result.title,
        description: result.description,
        company: result.company,
        url: result.url,
        created_at: result.created_at,
      },
    };
  } catch (err) {
    console.error(err);
    throw new DBError('Terjadi kesalahan pada Database');
  }
}

async function getUserById(id) {
  try {
    const query = {
      text: 'SELECT id, email, username FROM users WHERE id = $1',
      values: [id],
    };

    return (await pool.query(query)).rows[0] || null;
  } catch (err) {
    console.error(err);
    throw new DBError('Terjadi kesalahan pada server');
  }
}

async function getUserResumes(userId) {
  try {
    const query = {
      text: 'SELECT id, "userId", filename, "parsedText", upload_at FROM resumes WHERE "userId" = $1 ORDER BY upload_at DESC',
      values: [userId],
    };

    return (await pool.query(query)).rows;
  } catch (err) {
    console.error(err);
    throw new DBError('Terjadi kesalahan pada server');
  }
}

async function deleteRefreshTokenByTokenAndUserId(token, userId) {
  try {
    const query = {
      text: 'DELETE FROM "refreshToken" WHERE token = $1 AND "userId" = $2',
      values: [token, userId],
    };

    const result = await pool.query(query);

    return {
      status: 'success',
      data: {
        deleted: result.rowCount > 0,
      },
    };
  } catch (err) {
    console.error(err);
    throw new DBError('Terjadi kesalahan pada server');
  }
}

async function loginUser({ email, password }) {
  try {
    // const user = await prisma.user.findUnique({
    //   where: {
    //     email,
    //   },
    // });
    const user = await searchData('email', email);

    if (!user)
      return {
        status: 'fail',
        message: 'Email tidak ditemukan',
      };

    const comparePass = await bcrypt.compare(password, user.password);

    if (comparePass) {
      const existingTokenQuery = {
        text: 'SELECT token FROM "refreshToken" WHERE "userId" = $1 LIMIT 1',
        values: [user.id],
      };
      const existingTokenResult = await pool.query(existingTokenQuery);
      let refreshToken = existingTokenResult.rows[0]?.token;

      if (!refreshToken) {
        refreshToken = await token_manager.generatedRefreshToken({ id: user.id, email: user.email, username: user.username });
        const insertTokenQuery = {
          text: 'INSERT INTO "refreshToken" (token, "userId") VALUES ($1, $2)',
          values: [refreshToken, user.id],
        };
        await pool.query(insertTokenQuery);
      }

      return {
        status: 'success',
        data: {
          id: user.id,
          email: user.email,
          username: user.username,
          refreshToken,
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

async function updateUser({ id, username }) {
  try {
    const user = await searchData('id', id);

    if (!user)
      return {
        status: 'fail',
        message: 'Akun tidak ditemukan',
      };

    const query = {
      text: 'UPDATE users SET username = $1 WHERE id = $2 RETURNING username',
      values: [username, id],
    };
    const result = (await pool.query(query)).rows[0];

    return {
      status: 'success',
      data: { username: result.username },
    };
  } catch (err) {
    console.error(err);
    throw new DBError('Terjadi kesalahan pada Database');
  }
}

async function deleteUser({ id }) {
  try {
    const user = await searchData('id', id);

    if (!user)
      return {
        status: 'fail',
        message: 'Akun tidak ditemukan',
      };

    const query = {
      text: 'DELETE FROM users WHERE id = $1',
      values: [id],
    };
    await pool.query(query);

    return {
      status: 'success',
      message: 'Akun berhasil dihapus',
    };
  } catch (error) {
    console.error(error);
    throw new DBError('Terjadi kesalahan pada server');
  }
}

async function removeExpiredRefreshToken(token) {
  try {
    const query = {
      text: 'DELETE FROM "refreshToken" WHERE token = $1',
      values: [token],
    };
    await pool.query(query);

    return {
      status: 'success',
      message: 'Refresh token berhasil dihapus',
    };
  } catch (error) {
    console.error(error);
    throw new DBError('Terjadi kesalahan pada server');
  }
}

export { createUser, saveResume, saveJob, getUserById, getUserResumes, deleteRefreshTokenByTokenAndUserId, loginUser, removeExpiredRefreshToken, deleteUser, updateUser };
