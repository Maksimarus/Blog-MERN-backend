import express from 'express';
import mongoose from 'mongoose';

import authRouter from './routers/authRouter.js';
import postRouter from './routers/postRouter.js';

const PORT = 3333;
const DB_URL =
  'mongodb+srv://admin:admin123@blog.domh0.mongodb.net/blog?retryWrites=true&w=majority';
const app = express();

app.use(express.json());
app.use('/auth', authRouter);
app.use('', postRouter);

async function startServer() {
  try {
    await mongoose
      .connect(DB_URL, {useUnifiedTopology: true, useNewUrlParser: true})
      .then(() => console.log('database is OK'))
      .catch(error => console.log('database error', error));
    app.listen(PORT, () => console.log('Server is OK!'));
  } catch (error) {
    console.log(error);
  }
}
startServer();
