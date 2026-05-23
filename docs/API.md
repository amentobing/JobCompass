# Dokumentasi API JobCompass

## Ringkasan

API ini menyediakan endpoint untuk:

- Registrasi pengguna
- Login dan penerbitan token
- Prediksi kategori CV dari file PDF
- Verifikasi refresh token untuk mendapatkan access token baru

**Base URL:** `http://localhost:3001`

> Server berjalan dengan `npm run start` atau `npm run dev`.

---

## Format Respons Umum

Semua respons memiliki format berikut:

```json
{
  "status": "success" | "fail",
  "message": "string",
  "data": { }
}
```

- `status: success` → request berhasil
- `status: fail` → request gagal
- `data` dapat berupa objek, `null`, atau tidak ada (tergantung endpoint)

---

## 1. Registrasi Pengguna

### Endpoint

`POST /register`

### Deskripsi

Mendaftarkan pengguna baru.

### Body

`Content-Type: application/json`

```json
{
  "email": "user@example.com",
  "username": "user123",
  "password": "Abc123!",
  "confirmPass": "Abc123!"
}
```

### Validasi

- `email` wajib dan harus valid
- `username` wajib, hanya huruf/angka, panjang 4–10 karakter
- `password` wajib dan harus mengandung minimal 1 karakter khusus dari `._%#!-`
- `confirmPass` wajib dan harus sama dengan `password`

### Contoh Request

```bash
curl -X POST http://localhost:3001/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "username": "user123",
    "password": "Abc123!",
    "confirmPass": "Abc123!"
  }'
```

### Contoh Respons Sukses

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

### Contoh Respons Gagal

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

Melakukan login dan mengembalikan access token serta refresh token.

### Body

```json
{
  "email": "user@example.com",
  "password": "Abc123!"
}
```

### Contoh Request

```bash
curl -X POST http://localhost:3001/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "Abc123!"
  }'
```

### Contoh Respons Sukses

```json
{
  "status": "success",
  "message": "Berhasil login",
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### Contoh Respons Gagal

```json
{
  "status": "fail",
  "message": "Email tidak ditemukan"
}
```

---

## 3. Prediksi CV

### Endpoint

`POST /upload`

### Deskripsi

Mengunggah file CV dalam format PDF dan mengembalikan hasil prediksi kategori.

### Autentikasi

- **Tidak diwajibkan** saat ini.

### Body

`Content-Type: multipart/form-data`

Field:

- `file`: file PDF

### Contoh Request

```bash
curl -X POST http://localhost:3001/upload \
  -F "file=@/path/to/cv.pdf"
```

### Contoh Respons Sukses

```json
{
  "status": "success",
  "message": "File uploaded successfully",
  "data": {
    "prediction": {
      "class_id": 4,
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
    }
  }
}
```

### Contoh Respons Gagal

#### File bukan PDF

```json
{
  "status": "fail",
  "message": "Hanya file PDF yang diizinkan"
}
```

#### File tidak dikirim

```json
{
  "status": "fail",
  "message": "PDF file is required"
}
```

---

## 4. Refresh Token

### Endpoint

`GET /user/token`

### Deskripsi

Memverifikasi refresh token yang dikirim dan mengembalikan access token baru.

### Autentikasi

- **Wajib** menggunakan `Authorization: Bearer <accessToken>`
- Endpoint ini dilindungi oleh middleware autentikasi

### Body

`Content-Type: application/json`

```json
{
  "token": "<refresh-token>"
}
```

### Contoh Request

```bash
curl -X GET http://localhost:3001/user/token \
  -H "Authorization: Bearer <access-token>" \
  -H "Content-Type: application/json" \
  -d '{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }'
```

### Contoh Respons Sukses

```json
{
  "status": "success",
  "message": "Token valid",
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### Contoh Respons Gagal

```json
{
  "status": "fail",
  "message": "Refresh token sudah kadaluarsa"
}
```

---

## 5. Contoh Error Validasi

Jika payload tidak memenuhi skema, server akan mengembalikan error `400` dengan pesan Joi.

```json
{
  "status": "fail",
  "message": "email harus diisi!"
}
```

---

## 6. Status Kode Umum

| Status | Arti                                       |
| ------ | ------------------------------------------ |
| `200`  | Request berhasil                           |
| `201`  | Resource berhasil dibuat                   |
| `400`  | Payload tidak valid / request salah        |
| `401`  | Tidak terautentikasi atau file tidak valid |
| `500`  | Error server                               |

---

## 7. Catatan Tambahan

- `POST /upload` saat ini **tidak memerlukan autentikasi**.
- `GET /user/token` hanya dapat diakses jika access token valid.
- `refreshToken` berlaku selama 7 hari, sedangkan `accessToken` berlaku selama 15 menit.
- `password` harus mengikuti pola yang ketat; pastikan format sesuai.
