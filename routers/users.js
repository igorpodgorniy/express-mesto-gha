const routerUsers = require('express').Router();
const {
  getUsers,
  getUser,
  updateProfile,
  updateAvatar,
} = require('../controllers/users');

// Возвращаем всех пользователей
routerUsers.get('/', getUsers);

// Возвращаем опеределеннойго пользователя по id
routerUsers.get('/:userId', getUser);

// Обновляем профиль
routerUsers.patch('/me', updateProfile);

// Обновляем аватар
routerUsers.patch('/me/avatar', updateAvatar);

module.exports = routerUsers;
