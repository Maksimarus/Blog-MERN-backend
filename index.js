import express from 'express';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import {validationResult} from 'express-validator';
import bcrypt from 'bcrypt';

import {registerValidation} from './validations/auth.js';
import UserSchema from './models/User.js';

mongoose
  .connect(
    'mongodb+srv://admin:admin123@blog.domh0.mongodb.net/blog?retryWrites=true&w=majority',
  )
  .then(() => console.log('database is OK'))
  .catch(error => console.log('database error', error));

const PORT = 3333;
const app = express();
app.use(express.json());

app.post('/auth/register', registerValidation, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }

    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const doc = new UserSchema({
      fullName: req.body.fullName,
      email: req.body.email,
      avatarUrl: req.body.avatarUrl,
      passwordHash: hash,
    });

    const user = await doc.save();
    const {passwordHash, ...userData} = user._doc;

    const token = jwt.sign(
      {
        _id: user._id,
      },
      'secret123',
      {
        expiresIn: '30d',
      },
    );

    res.json({
      ...userData,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Не удалось зарегистрироваться',
    });
  }
});

app.listen(PORT, error => {
  if (error) {
    return console.log(error);
  }
  console.log('Server is OK!');
});
