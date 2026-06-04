# JobCompass Backend

Backend ini adalah server Node.js/Express untuk proyek Capstone JobCompass.
Server menerima unggahan file CV PDF, mengekstrak teks, melakukan prediksi kategori pekerjaan menggunakan model TensorFlow, dan mengambil rekomendasi pekerjaan dari LinkedIn Job Search API.

## Fitur Utama

- Express server dengan endpoint upload PDF
- Parsing teks PDF menggunakan `pdf2json`
- Transformasi teks ke TF-IDF dan prediksi kelas dengan model TensorFlow
- Pencarian pekerjaan berdasarkan hasil prediksi melalui LinkedIn API
- Middleware error handling dan dukungan CORS

## Struktur Proyek

- `src/server.js` - entry point server
- `src/routes/index.js` - router Express dengan endpoint `/upload`
- `src/controllers/predictController.js` - controller prediksi CV
- `src/utils/linkedin-api.js` - integrasi dengan LinkedIn Job Search API
- `src/utils/response.js` - helper response JSON
- `src/middleware/errorHandler.js` - penanganan error global
- `src/exceptions/` - class exception khusus
- `src/ml-model/` - model TensorFlow dan konfigurasi vectorizer

## Prasyarat

- Node.js 16.x
- Paket npm terinstal
- Koneksi internet untuk memanggil LinkedIn Job Search API

## Instalasi

1. Pasang dependensi:

```bash
npm install
```

2. Tambahkan file `.env` di root proyek untuk variabel lingkungan berikut:

```env
NODE_ENV=development
rapidkey_1=your_rapidapi_key_1
rapidkey_2=your_rapidapi_key_2
rapidkey_3=your_rapidapi_key_3
rapidkey_4=your_rapidapi_key_4
rapidkey_5=your_rapidapi_key_5
rapidhost=linkedin-job-search-api.p.rapidapi.com
```

> `rapidkey_*` bersifat opsional jika hanya satu kunci yang tersedia, tetapi kode mendukung beberapa kunci untuk fallback.

## Menjalankan Server

- Jalankan server biasa:

```bash
npm start
```

- Jalankan dengan `nodemon` untuk pengembangan:

```bash
npm run dev
```

Server akan berjalan di `http://localhost:3001`.

## Endpoint API

### `GET /`

Respons:

- status code `200`
- Pesan `Server sudah berjalan! 🚀`

### `POST /upload`

Upload file PDF CV menggunakan form-data dengan field `file`.

Contoh menggunakan `curl`:

```bash
curl -X POST http://localhost:3001/upload \
  -H "Content-Type: multipart/form-data" \
  -F "file=@/path/to/cv.pdf"
```

Response sukses:

```json
{
  "status": "success",
  "message": "File uploaded successfully",
  "data": {
    "prediction": {
      "category_name": "Information Technology",
      "confidence": 0.9245,
      "all_probabilities": {
        "Human Resources": 0.0123,
        "Information Technology": 0.9245,
        "Sales & Business Development": 0.0632,
        "Finance & Accounting": 0.0,
        "Operations": 0.0,
        "Healthcare": 0.0,
        "Education": 0.0,
        "Design & Creative": 0.0
      }
    },
    "jobs": [
      {
        "title": "...",
        "organization": "...",
        "location": "...",
        "description": "...",
        "link": "..."
      }
    ]
  }
}
```

## Aturan Upload

- Hanya menerima file PDF
- Maksimum ukuran file: `2 MB`

Jika format tidak valid, server akan merespons dengan error khusus `InvalidFileType`.

## Catatan Teknis

- Model TensorFlow dimuat saat server start melalui `loadMLModel()`
- Teks dari PDF diekstrak dan diolah menjadi vektor TF-IDF
- Prediksi model menggunakan `@tensorflow/tfjs-node`
- Data pekerjaan diambil melalui API RapidAPI LinkedIn Job Search

## Pengembangan Lanjutan

- Tambahkan validasi file yang lebih kuat
- Tingkatkan ekstraksi teks PDF untuk dokumen kompleks
- Tambahkan autentikasi dan logging
- Buat endpoint tambahan untuk status/model health check

## Lisensi

Proyek ini menggunakan lisensi `ISC` sebagaimana tertera di `package.json`.
