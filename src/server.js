import express from 'express';
import router from './routes/index.js';
import errorHandler from './middleware/errorHandler.js';
import cors from 'cors';
import { loadMLModel } from './controllers/predictController.js';

const app = express();
const port = 3001;
const host = process.env.NODE_ENV == 'production' ? '' : 'localhost';

app.use(cors());

app.use(express.json());

app.get('/', (req, res) => {
  res.send('<h1>Server sudah berjalan! 🚀</h1>');
});

app.use('/', router);
app.use(errorHandler);

app.listen(port, async () => {
  await loadMLModel();
  console.log(`\nServer berjalan di http://${host}:${port}`);
});
