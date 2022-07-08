import {body} from 'express-validator';

export const postCreateValidation = [
  body('email', 'Неверный формат почты').isEmail(),
  body('password', 'Пароль должен содержать минимум 5 символов').isLength({min: 5}),
  body('fullName', 'Укажите имя').isLength({min: 5}),
  body('avatarUrl', 'Неверная ссылка на аватар').optional().isURL(),
];
