import 'dotenv/config';
import { Pool } from 'pg';
import bcrypt from 'bcrypt';
import { DBError } from '../exceptions/index.js';
import token_manager from '../security/token-manager.js';
import { nanoid } from 'nanoid';

const pool = new Pool();

// ==========================================
// HELPER FUNCTIONS (Internal)
// ==========================================

async function getUserByEmail(email) {
  const query = {
    text: 'SELECT * FROM users WHERE email = $1',
    values: [email],
  };
  return (await pool.query(query)).rows[0];
}

async function getUserByIdHelper(id) {
  const query = {
    text: 'SELECT * FROM users WHERE id = $1',
    values: [id],
  };
  return (await pool.query(query)).rows[0];
}

// ==========================================
// USERS & AUTHENTICATION
// ==========================================

async function createUser({ email, username, password }) {
  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    return {
      status: 'fail',
      message: 'Akun dengan Email ini sudah terdaftar',
    };
  }

  const saltRounds = 12;
  const passHash = await bcrypt.hash(password, saltRounds);
  const id = nanoid(8);

  try {
    const query = {
      text: 'INSERT INTO users (id, email, username, password) VALUES ($1, $2, $3, $4) RETURNING id, email, username',
      values: [id, email, username, passHash],
    };

    const result = (await pool.query(query)).rows[0];

    return {
      status: 'success',
      data: {
        email: result.email,
        userId: result.id,
      },
    };
  } catch (err) {
    console.error('[DB ERROR - createUser]:', err.message);
    throw new DBError('Terjadi kesalahan pada Database saat membuat akun');
  }
}

async function loginUser({ email, password }) {
  try {
    const user = await getUserByEmail(email);

    if (!user) {
      return {
        status: 'fail',
        message: 'Email tidak ditemukan',
      };
    }

    const comparePass = await bcrypt.compare(password, user.password);
    if (!comparePass) {
      return {
        status: 'fail',
        message: 'Password salah',
      };
    }

    // Cek apakah user sudah memiliki refresh token aktif
    const existingTokenQuery = {
      text: 'SELECT token FROM "refreshToken" WHERE "userId" = $1 LIMIT 1',
      values: [user.id],
    };
    const existingTokenResult = await pool.query(existingTokenQuery);
    let refreshToken = existingTokenResult.rows[0]?.token;

    // Buat token baru jika belum ada
    if (!refreshToken) {
      refreshToken = await token_manager.generatedRefreshToken({
        id: user.id,
        email: user.email,
        username: user.username,
      });

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
  } catch (error) {
    console.error('[DB ERROR - loginUser]:', error.message);
    throw new DBError('Terjadi kesalahan pada server saat proses login');
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
    console.error('[DB ERROR - getUserById]:', err.message);
    throw new DBError('Terjadi kesalahan pada server');
  }
}

async function updateUser({ id, username }) {
  try {
    const user = await getUserByIdHelper(id);

    if (!user) {
      return {
        status: 'fail',
        message: 'Akun tidak ditemukan',
      };
    }

    const query = {
      text: 'UPDATE users SET username = $1, update_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING username',
      values: [username, id],
    };

    const result = (await pool.query(query)).rows[0];

    return {
      status: 'success',
      data: { username: result.username },
    };
  } catch (err) {
    console.error('[DB ERROR - updateUser]:', err.message);
    throw new DBError('Terjadi kesalahan pada Database saat memperbarui user');
  }
}

async function deleteUser({ id }) {
  try {
    const user = await getUserByIdHelper(id);

    if (!user) {
      return {
        status: 'fail',
        message: 'Akun tidak ditemukan',
      };
    }

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
    console.error('[DB ERROR - deleteUser]:', error.message);
    throw new DBError('Terjadi kesalahan pada server saat menghapus akun');
  }
}

// ==========================================
// RESUMES & JOBS
// ==========================================

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
    console.error('[DB ERROR - saveResume]:', err.message);
    throw new DBError('Terjadi kesalahan pada Database saat menyimpan resume');
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
    console.error('[DB ERROR - getUserResumes]:', err.message);
    throw new DBError('Terjadi kesalahan pada server saat mengambil resume');
  }
}
async function getUserHistory(userId) {
  try {
    const resumesQuery = {
      text: 'SELECT id, filename, "parsedText", upload_at FROM resumes WHERE "userId" = $1 ORDER BY upload_at DESC',
      values: [userId],
    };
    const resumes = (await pool.query(resumesQuery)).rows;

    if (resumes.length === 0) {
      return [];
    }

    const resumeIds = resumes.map((resume) => resume.id);
    const jobsQuery = {
      text: 'SELECT id, "resumeId", title, description, company, url, created_at FROM jobs WHERE "resumeId" = ANY($1) ORDER BY created_at DESC',
      values: [resumeIds],
    };
    const jobs = (await pool.query(jobsQuery)).rows;

    const history = resumes.map((resume) => {
      return {
        ...resume,
        jobs: jobs.filter((job) => job.resumeId === resume.id),
      };
    });

    return history;
  } catch (err) {
    console.error('[DB ERROR - getUserHistory]:', err.message);
    throw new DBError('Terjadi kesalahan pada server saat mengambil riwayat data');
  }
}
async function saveJob({ resumeId, title, organization, location, countries, description, url, org_url, org_employees, org_slogan, org_industry, org_specialties, org_locations, org_description, org_followers }) {
  try {
    const id = nanoid(8);
    const query = {
      text: `INSERT INTO jobs (
        id, "resumeId", title, organization, location, countries, description, url,
        org_url, org_employees, org_slogan, org_industry, org_specialties, org_locations, org_description, org_followers
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16) RETURNING *`,
      values: [
        id,
        resumeId,
        title,
        organization,
        location,
        countries,
        description,
        url,
        org_url,
        org_employees,
        org_slogan,
        org_industry,
        org_specialties ? JSON.stringify(org_specialties) : null,
        org_locations ? JSON.stringify(org_locations) : null,
        org_description,
        org_followers,
      ],
    };

    const result = (await pool.query(query)).rows[0];

    return {
      status: 'success',
      data: {
        id: result.id,
        resumeId: result.resumeId,
        title: result.title,
        organization: result.organization,
        location: result.location,
        countries: result.countries,
        description: result.description,
        url: result.url,
        organizationData: {
          url: result.org_url,
          employees: result.org_employees,
          slogan: result.org_slogan,
          industry: result.org_industry,
          specialties: result.org_specialties ? JSON.parse(result.org_specialties) : [],
          locations: result.org_locations ? JSON.parse(result.org_locations) : [],
          description: result.org_description,
          followers: result.org_followers,
        },
        created_at: result.created_at,
      },
    };
  } catch (err) {
    console.error('[DB ERROR - saveJob]:', err.message);
    throw new DBError('Terjadi kesalahan pada Database saat menyimpan job');
  }
}

// ==========================================
// TOKENS (REFRESH TOKEN)
// ==========================================

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
    console.error('[DB ERROR - deleteRefreshTokenByTokenAndUserId]:', err.message);
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
    console.error('[DB ERROR - removeExpiredRefreshToken]:', error.message);
    throw new DBError('Terjadi kesalahan pada server');
  }
}

export { createUser, saveResume, saveJob, getUserById, getUserResumes, getUserHistory, deleteRefreshTokenByTokenAndUserId, loginUser, removeExpiredRefreshToken, deleteUser, updateUser };
