import ClientError from '../exceptions/client-error.js';
import { saveResume, saveJob } from '../utils/db.js';
import { linkedinAPI } from '../utils/linkedin-api.js';

import tf from '@tensorflow/tfjs-node';
import fs from 'fs';
import PDFParser from 'pdf2json';
import path from 'path';
import { pathToFileURL } from 'url';

let model;
let vocab;
let idfValues;

function textToTfidfVector(text) {
  const MAX_FEATURES = 1500;
  const vector = new Array(MAX_FEATURES).fill(0);

  // Tokenisasi sederhana (ubah ke huruf kecil, ambil kata dengan huruf/angka)
  const words = text.toLowerCase().match(/\b\w\w+\b/g) || [];

  // Hitung Term Frequency (TF) di dalam dokumen CV
  const tfCounts = {};
  words.forEach((word) => {
    tfCounts[word] = (tfCounts[word] || 0) + 1;
  });

  // Hitung TF-IDF
  let sumSquares = 0;
  for (let word in tfCounts) {
    if (vocab.hasOwnProperty(word)) {
      const index = vocab[word];
      if (index < MAX_FEATURES) {
        // Nilai = TF * IDF
        const val = tfCounts[word] * idfValues[index];
        vector[index] = val;
        sumSquares += val * val;
      }
    }
  }

  // L2 Normalization (Default dari Scikit-Learn TfidfVectorizer)
  if (sumSquares > 0) {
    const norm = Math.sqrt(sumSquares);
    for (let i = 0; i < MAX_FEATURES; i++) {
      vector[i] /= norm;
    }
  }

  return vector;
}

function extractTextFromPDF(buffer) {
  return new Promise((resolve, reject) => {
    const pdfParser = new PDFParser(this, 1); // Argumen '1' memaksa mode text-only

    pdfParser.on('pdfParser_dataError', (errData) => reject(errData.parserError));
    pdfParser.on('pdfParser_dataReady', () => {
      resolve(pdfParser.getRawTextContent());
    });

    pdfParser.parseBuffer(buffer);
  });
}

export async function loadMLModel() {
  try {
    console.log('\nSedang memuat model Machine Learning...');
    const vectorizerConfigPath = path.resolve('src/ml-model/vectorizer_config.json');
    const vectorizerConfig = JSON.parse(fs.readFileSync(vectorizerConfigPath, 'utf8'));
    vocab = vectorizerConfig.vocabulary;
    idfValues = vectorizerConfig.idf_values;

    const modelPath = path.resolve('src/ml-model/model.json');
    model = await tf.loadGraphModel(tf.io.fileSystem(modelPath));
    console.log('Model ML berhasil dimuat!');
  } catch (error) {
    console.error('Error saat memuat model:', error.message);
    process.exit(1);
  }
}

async function predictCV(cvBuffer) {
  if (!model) {
    throw new Error('Model belum siap digunakan');
  }

  // 1. Ekstrak Teks dari PDF
  const cvText = await extractTextFromPDF(cvBuffer);

  // 2. Preprocessing: Ubah teks CV menjadi Array[1500]
  const tfidfVector = textToTfidfVector(cvText);

  // 3. Ubah Array ke Tensor TensorFlow [batch_size=1, features=1500]
  const inputTensor = tf.tensor2d([tfidfVector], [1, 1500], 'float32');

  // 4. Lakukan Prediksi
  const prediction = model.predict(inputTensor);
  const probabilities = prediction.dataSync();
  const predictedClassId = prediction.argMax(-1).dataSync()[0];

  // Sesuaikan dengan nama label/kategori yang ada di dataset Anda
  const LABEL_NAMES = ['Human Resources', 'Customer Service', 'Sales & Business Development', 'Finance & Accounting', 'Information Technology', 'Operations', 'Healthcare', 'Education', 'Design & Creative'];

  const allProbObj = {};
  LABEL_NAMES.forEach((label, index) => {
    // Membulatkan probabilitas jadi 4 angka di belakang koma (misal: 0.9253)
    if (probabilities[index] !== null && !isNaN(probabilities[index])) {
      allProbObj[label] = parseFloat(probabilities[index].toFixed(4));
    }
  });

  // Bebaskan memori tensor
  tf.dispose([inputTensor, prediction]);

  return {
    prediction: {
      category_name: LABEL_NAMES[predictedClassId],
      confidence: parseFloat(probabilities[predictedClassId]),
      all_probabilities: allProbObj,
    },
    parsedText: cvText,
  };
}

export default async function predictCVController(req, res, next) {
  try {
    if (!req.file || !req.file.buffer) {
      throw new ClientError('Tidak dapat menemukan file PDF', 400);
    }

    const cv = req.file.buffer;
    const { prediction, parsedText } = await predictCV(cv);
    const jobs = await linkedinAPI(prediction.category_name);

    // 1. Simpan Resume ke Database
    const resumeResult = await saveResume({
      userId: req.user.id,
      filename: req.file.originalname,
      parsedText,
    });
    if (resumeResult.status === 'fail') {
      return res.status(400).json({
        status: 'fail',
        message: resumeResult.message,
      });
    }

    const resumeId = resumeResult.data.id;
    // 2. Simpan Hasil Lowongan Kerja (RapidAPI) yang berkaitan dengan resumeId ini
    if (jobs && Array.isArray(jobs)) {
      for (const job of jobs) {
        const jobResult = await saveJob({
          resumeId,
          title: job.title,
          organization: job.organization,
          location: job.location,
          countries: job.countries,
          description: job.description,
          url: job.link,
          org_url: job.organizationData?.url,
          org_employees: job.organizationData?.employees,
          org_slogan: job.organizationData?.slogan,
          org_industry: job.organizationData?.industry,
          org_specialties: job.organizationData?.spesialities,
          org_locations: job.organizationData?.location,
          org_description: job.organizationData?.description,
          org_followers: job.organizationData?.followers,
        });
      }
    }

    res.json({
      status: 'success',
      message: 'File uploaded successfully',
      data: {
        prediction,
        jobs,
        // resume: resumeResult.data,
      },
    });
  } catch (err) {
    next(err);
  }
}
