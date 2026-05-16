import { Router } from 'express';
import registHandler from './handlers/registHandler.js';
import loginHandler from './handlers/loginHandler.js';
import { loginSchema, registSchema } from './validator/schema.js';
import validate from './middleware/validate.js';
import authenticationToken from './middleware/auth.js';

const router = Router();

router.post('/register', validate(registSchema), registHandler);
router.post('/login', validate(loginSchema), loginHandler);

export default router;
