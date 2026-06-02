# Dokumentasi API JobCompass

## Ringkasan

Base URL: `http://localhost:3001`

API ini menyediakan fungsi:

- Registrasi user
- Login dan penerbitan token
- Upload PDF resume dan prediksi pekerjaan
- Penyimpanan resume hasil scan beserta nama file
- Pengambilan profil user
- Pengambilan semua resume yang pernah diupload user
- Update username user
- Logout dengan menghapus refresh token
- Verifikasi refresh token

---

## Format Respons Umum

Semua respons memiliki format JSON berikut:

```json
{
  "status": "success" | "fail",
  "message": "string",
  "data": { ... }
}
```

- `status: success` → operasi berhasil
- `status: fail` → operasi gagal
- `data` dapat berisi objek, array, atau properti lainnya

---

## 1. Registrasi User

### Endpoint

`POST /register`

### Deskripsi

Mendaftarkan user baru ke sistem.

### Request Body

`Content-Type: application/json`

```json
{
  "email": "user@example.com",
  "username": "user123",
  "password": "Abc123!",
  "confirmPass": "Abc123!"
}
```

### Respons Sukses

```json
{
  "status": "success",
  "message": "User telah ditambahkan, silahkan login menggunakan username dan password yang terdaftar",
  "data": {
    "email": "user@example.com",
    "userId": "abc12345"
  }
}
```

### Respons Gagal

```json
{
  "status": "fail",
  "message": "Akun dengan Email ini sudah terdaftar"
}
```

---

## 2. Login

### Endpoint

`POST /login`

### Deskripsi

Melakukan login dan mengembalikan `accessToken` dan `refreshToken`.

### Request Body

`Content-Type: application/json`

```json
{
  "email": "user@example.com",
  "password": "Abc123!"
}
```

### Respons Sukses

```json
{
  "status": "success",
  "message": "Berhasil login",
  "data": {
    "accessToken": "eyJhbGciOi...",
    "refreshToken": "eyJhbGciOi..."
  }
}
```

### Respons Gagal

```json
{
  "status": "fail",
  "message": "Email tidak ditemukan"
}
```

---

## 3. Upload Resume dan Prediksi Job

### Endpoint

`POST /upload`

### Deskripsi

Mengunggah file PDF resume, melakukan ekstraksi teks, menyimpan resume ke database, dan mencari pekerjaan yang relevan.

### Autentikasi

- Wajib: `Authorization: Bearer <accessToken>`

### Request

`Content-Type: multipart/form-data`

Field:

- `file`: file PDF

### Contoh Request

```bash
curl -X POST http://localhost:3001/upload \
  -H "Authorization: Bearer <accessToken>" \
  -F "file=@/path/to/resume.pdf"
```

### Respons Sukses

```json
{
  "status": "success",
  "message": "File uploaded successfully",
  "data": {
    "prediction": {
      "category_name": "Information Technology",
      "confidence": 0.9231,
      "all_probabilities": {
        "Human Resources": 0.0123,
        "Customer Service": 0.0111,
        "Sales & Business Development": 0.0212,
        "Finance & Accounting": 0.0312,
        "Information Technology": 0.9231,
        "Operations": 0.0005,
        "Healthcare": 0.0004,
        "Education": 0.0002,
        "Design & Creative": 0.0
      }
    },
    "jobs": [
      {
        "title": "Frontend Developer",
        "description": "...",
        "organization": "Example Company",
        "link": "https://example.com/job/123"
      }
    ]
  }
}
```

### Respons Gagal

```json
{
  "status": "fail",
  "message": "Tidak dapat menemukan file PDF"
}
```

---

## 4. Verifikasi Refresh Token

### Endpoint

`GET /user/token`

### Deskripsi

Memverifikasi refresh token dan menghasilkan `accessToken` baru.

### Request Body

`Content-Type: application/json`

```json
{
  "token": "<refreshToken>"
}
```

### Respons Sukses

```json
{
  "status": "success",
  "message": "Token valid",
  "data": {
    "accessToken": "eyJhbGciOi..."
  }
}
```

---

## 5. Ambil Profil User

### Endpoint

`GET /user/profile`

### Deskripsi

Mengambil data profil user dan semua resume yang sudah diupload user.

### Autentikasi

- Wajib: `Authorization: Bearer <accessToken>`

### Respons Sukses

```json
{
  "status": "success",
  "message": "Profil berhasil diambil",
  "data": {
    "user": {
      "id": "abc12345",
      "email": "user@example.com",
      "username": "user123"
    },
    "resumes": [
      {
        "id": "resume1",
        "userId": "abc12345",
        "filename": "resume.pdf",
        "parsedText": "Isi resume...",
        "upload_at": "2026-06-02T12:34:56.000Z"
      }
    ]
  }
}
```

---

## 6. Update Username User

### Endpoint

`PUT /user/profile`

### Deskripsi

Memperbarui username user yang sedang login.

### Autentikasi

- Wajib: `Authorization: Bearer <accessToken>`

### Request Body

`Content-Type: application/json`

```json
{
  "username": "newUsername"
}
```

### Respons Sukses

```json
{
  "status": "success",
  "message": "Username berhasil diperbarui",
  "data": {
    "username": "newUsername"
  }
}
```

---

## 7. Riwayat Resume dan Job

### Endpoint

`GET /user/history`

### Deskripsi

Mengambil riwayat resume dan daftar pekerjaan yang tersimpan untuk setiap resume.

### Autentikasi

- Wajib: `Authorization: Bearer <accessToken>`

### Respons Sukses

```json
{
  "status": "success",
  "message": "Riwayat resume dan lowongan kerja berhasil diambil",
  "data": [
    {
      "id": "resume1",
      "filename": "resume.pdf",
      "parsedText": "Isi resume...",
      "upload_at": "2026-06-02T12:34:56.000Z",
      "jobs": [
        {
          "id": "job1",
          "resumeId": "resume1",
          "title": "Frontend Developer",
          "description": "...",
          "company": "Example Company",
          "url": "https://example.com/job/123",
          "created_at": "2026-06-02T12:35:01.000Z"
        }
      ]
    }
  ]
}
```

---

## 8. Logout

### Endpoint

`POST /user/logout`

### Deskripsi

Menghapus refresh token yang sedang dipakai untuk logout.

### Autentikasi

- Wajib: `Authorization: Bearer <accessToken>`

### Request Body

`Content-Type: application/json`

```json
{
  "token": "<refreshToken>"
}
```

### Respons Sukses

```json
{
  "status": "success",
  "message": "Logout berhasil",
  "data": {
    "deleted": true
  }
}
```

---

## 9. Catatan Tambahan

- Semua endpoint `/user/*` memerlukan header `Authorization: Bearer <accessToken>`.
- Endpoint `GET /user/token` menerima refresh token di body meskipun menggunakan method GET.
- File upload pada `POST /upload` harus berupa PDF.
- Resume yang diupload disimpan bersama `filename`, `parsedText`, dan `upload_at`.
