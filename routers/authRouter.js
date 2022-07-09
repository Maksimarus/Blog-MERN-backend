import {Router} from 'express';

import UserController from '../controllers/UserController.js';
import * as auth from '../validations/auth.js';
import checkAuth from '../utils/checkAuth.js';
import handleValidationErrors from '../utils/handleValidationErrors.js';

const authRouter = new Router();

authRouter.post(
  '/login',
  auth.loginValidation,
  handleValidationErrors,
  UserController.login,
);
authRouter.post(
  '/register',
  auth.registerValidation,
  handleValidationErrors,
  UserController.register,
);
authRouter.get('/me', checkAuth, UserController.getMe);

export default authRouter;
