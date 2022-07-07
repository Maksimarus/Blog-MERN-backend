import {validationResult} from 'express-validator';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import UserSchema from '../models/User.js';

export const register = async (req, res) => {
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
};
export const login = async (req, res) => {
  try {
    const user = await UserSchema.findOne({email: req.body.email});
    if (!user) {
      return res.status(404).json({
        message: 'Пользователь не найден',
      });
    }
    const isValidPass = await bcrypt.compare(req.body.password, user._doc.passwordHash);
    if (!isValidPass) {
      return res.status(404).json({
        message: 'Неверный логин или пароль',
      });
    }
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
      message: 'Не удалось авторизоваться',
    });
  }
};
export const getMe = async (req, res) => {
  try {
    const user = await UserSchema.findById(req.userId);
    if (!user) {
      return res.status(404).json({
        message: 'Пользователь не найден',
      });
    }
    const {passwordHash, ...userData} = user._doc;
    res.json({
      ...userData,
    });
  } catch (error) {
    return res.status(403).json({
      message: 'Нет доступа',
    });
  }
};