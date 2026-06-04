import { Router } from 'express';
import { InvalidFileType } from '../exceptions/index.js';
import predictCVController from '../controllers/predictController.js';
import multer from 'multer';

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 2 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    if (/\.pdf$/i.test(file.originalname)) {
      cb(null, true);
    } else {
      cb(new InvalidFileType('Hanya file PDF yang diizinkan'), false);
    }
  },
});

const router = Router();

router.post('/upload', upload.single('file'), predictCVController);

export default router;
