import {validationResult} from 'express-validator';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import UserModel from '../models/User.js';

class UserController {
  async register(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json(errors.array());
      }

      const password = req.body.password;
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);

      const doc = new UserModel({
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
  }
  async login(req, res) {
    try {
      const user = await UserModel.findOne({email: req.body.email});
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
  }
  async getMe(req, res) {
    try {
      const user = await UserModel.findById(req.userId);
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
  }
}

export default new UserController();
