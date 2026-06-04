# JobCompass (CC26-PSU054)

JobCompass adalah platform capstone untuk membuat solusi AI dan data-driven yang membantu mengklasifikasikan kategori pekerjaan, menganalisis tren pasar, dan menghubungkan pengguna dengan peluang kerja relevan.

## 📌 Tujuan Proyek

JobCompass dirancang sebagai sistem end-to-end yang menggabungkan:

- Prediksi kategori pekerjaan berbasis keterampilan menggunakan model TensorFlow
- Dashboard analisis pasar pekerjaan dan kompensasi
- Backend API untuk prediksi CV dan integrasi pencarian kerja
- Frontend web modern untuk unggah CV, hasil rekomendasi, dan tampilan dashboard

## 🌐 Struktur Repositori

Proyek ini dibangun sebagai satu repository utama dengan dokumentasi terpisah untuk setiap tim. Untuk menampilkan ringkasan utama di branch `main`, gunakan README ini.

Masing-masing tim mengerjakan branch terpisah:

- `ai-engineer` — model AI, training, API prediksi
- `data-science` — dashboard analitik, pembersihan data, eksplorasi fitur
- `backend-server` — server Node.js/Express untuk upload CV, prediksi ML, dan integrasi LinkedIn
- `frontend` — aplikasi React/Tailwind untuk mengunggah CV dan menampilkan hasil

> Catatan: dokumentasi khusus setiap modul ada di branch terkait. README ini adalah ringkasan gabungan untuk repository utama.

## 🧩 Komponen Utama

1. **AI Engineer Module**
   - Model klasifikasi job category dengan TensorFlow
   - Custom layer, custom loss, dan custom callback
   - REST API FastAPI untuk prediksi satuan dan batch
   - Generative AI insight dengan Anthropic Claude opsional

2. **Data Science Module**
   - Dashboard analisis tren pasar pekerjaan menggunakan Streamlit + Plotly
   - Dataset pembersihan dan eksplorasi dari sumber Kaggle
   - Visualisasi permintaan pasar, kompensasi, dan keterampilan kunci

3. **Backend Module**
   - Node.js/Express server untuk upload PDF CV
   - Ekstraksi teks PDF dan transformasi TF-IDF
   - Prediksi kategori dengan model TensorFlow JS
   - Integrasi LinkedIn Job Search API melalui RapidAPI

4. **Frontend Module**
   - Aplikasi React + Vite + Tailwind CSS
   - Unggah CV, tampilkan rekomendasi job matching, dan dashboard interaktif
   - Menyimpan hasil sementara melalui `localStorage`

## 🛠️ Teknologi yang Digunakan

- Python, TensorFlow, scikit-learn, pandas, numpy
- FastAPI, Uvicorn
- Streamlit, Plotly Express, Matplotlib, Seaborn
- Node.js, Express, `@tensorflow/tfjs-node`
- React 19, Vite, Tailwind CSS v4, Framer Motion
- PDF parsing menggunakan `pdf2json`
- Integrasi API external untuk job search

## 🚀 Cara Menjalankan Proyek

### 1. AI Engineer / Model & API

1. Masuk ke branch `ai-engineer`.
2. Buat virtual environment dan aktifkan.
3. Install dependencies:
   ```bash
   pip install tensorflow scikit-learn pandas numpy fastapi uvicorn anthropic nest-asyncio
   ```
4. Jalankan notebook model untuk preprocessing dan training.
5. Mulai API:
   ```bash
   uvicorn api:app --host 0.0.0.0 --port 8000 --reload
   ```
6. Jika ingin menggunakan insight generative AI, set `ANTHROPIC_API_KEY`.

### 2. Data Science / Dashboard Market Insights

1. Masuk ke branch `data-science`.
2. Buat dan aktifkan virtual environment.
3. Install dependensi dari `requirements.txt`.
4. Jalankan notebook untuk membersihkan data dan menghasilkan dataset.
5. Masuk ke direktori dashboard dan jalankan:
   ```bash
   streamlit run app.py
   ```
6. Buka browser pada alamat yang ditampilkan (biasanya `http://localhost:8501`).

### 3. Backend / Server Prediksi CV

1. Masuk ke branch `backend`.
2. Pasang dependensi:
   ```bash
   npm install
   ```
3. Tambahkan file `.env` dengan kunci RapidAPI dan pengaturan host.
4. Jalankan server:
   ```bash
   npm start
   ```
5. Endpoint akan berjalan di `http://localhost:3001`.

### 4. Frontend / UI Aplikasi

1. Masuk ke branch `frontend`.
2. Pasang dependensi:
   ```bash
   npm install
   ```
3. Jalankan:
   ```bash
   npm run dev
   ```
4. Buka `http://localhost:5173`.

## 📌 Ringkasannya

JobCompass adalah proyek kolaboratif yang menghubungkan:

- kemampuan AI untuk klasifikasi pekerjaan,
- analisis pasar untuk wawasan bisnis,
- backend prediksi CV dan pencarian pekerjaan,
- serta frontend interaktif untuk pengguna akhir.

Jika Anda ingin melihat dokumentasi lengkap per tim, lihat branch masing-masing tim.
