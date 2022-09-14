const routerUsers = require('express').Router();
const {
  createUser,
  getUsers,
  getUser,
  updateProfile,
  updateAvatar,
} = require('../controllers/users');

// Возвращаем всех пользователей
routerUsers.get('/', getUsers);

// Возвращаем опеределеннойго пользователя по id
routerUsers.get('/:userId', getUser);

// Создаём пользователя
routerUsers.post('/', createUser);

// Обновляем профиль
routerUsers.patch('/me', updateProfile);

// Обновляем аватар
routerUsers.patch('/me/avatar', updateAvatar);

module.exports = routerUsers;
