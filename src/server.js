import express from 'express';
import router from './routes.js';
import errorHandler from './handlers/errorHandler.js';

const app = express();
const port = 3001;
const host = process.env.NODE_ENV == 'production' ? '' : '192.168.68.109';
app.use(express.json());

app.get('/', (req, res) => {
  res.send('<h1>Server sudah berjalan! 🚀</h1>');
});

app.use('/', router);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server berjalan di http://${host}:${port}`);
});
