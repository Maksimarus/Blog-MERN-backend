import express from 'express';
import mongoose from 'mongoose';

import {registerValidation} from './validations/auth.js';
import checkAuth from './utils/checkAuth.js';
import * as UserController from './controllers/UserController.js';

mongoose
  .connect(
    'mongodb+srv://admin:admin123@blog.domh0.mongodb.net/blog?retryWrites=true&w=majority',
  )
  .then(() => console.log('database is OK'))
  .catch(error => console.log('database error', error));

const PORT = 3333;
const app = express();
app.use(express.json());

app.post('/auth/login', UserController.login);
app.post('/auth/register', registerValidation, UserController.register);
app.get('/auth/me', checkAuth, UserController.getMe);

app.listen(PORT, error => {
  if (error) {
    return console.log(error);
  }
  console.log('Server is OK!');
});
