import { Router } from 'express';
import { loginHandler, registHandler } from '../controllers/authController.js';
import { loginSchema, registSchema } from '../validator/schema.js';
import validate from '../middleware/validate.js';
import authenticationToken from '../middleware/auth.js';
import predictCVController from '../controllers/predictController.js';
import token_manager from '../security/token-manager.js';
import { InvalidFileType } from '../exceptions/index.js';
import userRouter from '../controllers/userController.js';

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

router.post('/register', validate(registSchema), registHandler);
router.post('/login', validate(loginSchema), loginHandler);

router.post('/upload', authenticationToken, upload.single('file'), predictCVController);

router.use('/user', authenticationToken, userRouter);

export default router;
