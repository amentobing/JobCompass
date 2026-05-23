import { Router } from 'express';
import register from './controllers/register.js';
import login from './controllers/login.js';
import { loginSchema, registSchema } from './validator/schema.js';
import validate from './middleware/validate.js';
import authenticationToken from './middleware/auth.js';
import predictCVController from './controllers/predict.js';
import token_manager from './security/token-manager.js';
import { InvalidFileType } from './exceptions/index.js';
import userRouter from './controllers/users.js';

import multer from 'multer';
const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => {
    if (/\.pdf$/i.test(file.originalname)) {
      cb(null, true);
    } else {
      cb(new InvalidFileType('Hanya file PDF yang diizinkan'), false);
    }
  },
});

const router = Router();

router.post('/register', validate(registSchema), register);
router.post('/login', validate(loginSchema), login);

// router.post('/upload', authenticationToken, upload.single('file'), predictCVController);
router.post('/upload', upload.single('file'), predictCVController);

router.use('/user', authenticationToken, userRouter);

export default router;
