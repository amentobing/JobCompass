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

export async function predictCV(cvBuffer) {
  try {
    const vectorizerConfigPath = path.resolve('src/model/vectorizer_config.json');
    const vectorizerConfig = JSON.parse(fs.readFileSync(vectorizerConfigPath, 'utf8'));
    vocab = vectorizerConfig.vocabulary;
    idfValues = vectorizerConfig.idf_values;

    if (!model) {
      const modelPath = path.resolve('src/model/model.json');
      // const modelUrl = decodeURI(pathToFileURL(modelPath).href);
      model = await tf.loadGraphModel(tf.io.fileSystem(modelPath));
    }
  } catch (error) {
    throw new Error('Error Load Model: ' + error.message);
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
      class_id: predictedClassId,
      category_name: LABEL_NAMES[predictedClassId],
      confidence: probabilities[predictedClassId],
      all_probabilities: allProbObj,
    },
    parsedText: cvText,
  };
}
