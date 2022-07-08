import {Router} from 'express';

import UserController from '../controllers/UserController.js';
import * as auth from '../validations/auth.js';
import checkAuth from '../utils/checkAuth.js';

const authRouter = new Router();

authRouter.post('/login', auth.loginValidation, UserController.login);
authRouter.post('/register', auth.registerValidation, UserController.register);
authRouter.get('/me', checkAuth, UserController.getMe);

export default authRouter;
