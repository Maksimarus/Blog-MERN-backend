import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';

import authRouter from './routers/authRouter.js';
import postRouter from './routers/postRouter.js';
import checkAuth from './utils/checkAuth.js';

const PORT = 3333;
const DB_URL =
  'mongodb+srv://admin:admin123@blog.domh0.mongodb.net/blog?retryWrites=true&w=majority';
const app = express();

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, 'uploads');
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({storage});

app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  });
});

app.use(express.json());
app.use('/uploads', express.static('uploads'));
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
