const routerUsers = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const regExp = require('../constants/constants');
const {
  getUsers,
  getUser,
  updateProfile,
  updateAvatar,
  getCurrentUser,
} = require('../controllers/users');

// Возвращаем всех пользователей
routerUsers.get('/', getUsers);

// Возвращаем текущего пользователя
routerUsers.get('/me', getCurrentUser);

// Обновляем профиль
routerUsers.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), updateProfile);

// Обновляем аватар
routerUsers.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().pattern(regExp),
  }),
}), updateAvatar);

// Возвращаем опеределеннойго пользователя по id
routerUsers.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().length(24).hex().required(),
  }),
}), getUser);

module.exports = routerUsers;
