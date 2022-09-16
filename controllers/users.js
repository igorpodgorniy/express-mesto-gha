const User = require('../models/user');
const {
  DEFAULT_ERROR,
  VALIDATIN_ERROR,
  NOT_FOUND_ERROR,
} = require('../constants/errors');

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(VALIDATIN_ERROR).send({ message: 'Были отправлены некорректные данные' });
      }
      return res.status(DEFAULT_ERROR).send({ message: 'Что-то пошло не так' });
    });
};

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => res.status(DEFAULT_ERROR).send({ message: 'Что-то пошло не так' }));
};

const getUser = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        return res.status(NOT_FOUND_ERROR).send({ message: 'Пользователь с указанным id не существует' });
      }
      return res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(VALIDATIN_ERROR).send({ message: 'Был указан некорректный id' });
      }
      return res.status(DEFAULT_ERROR).send({ message: 'Что-то пошло не так' });
    });
};

const updateProfile = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(VALIDATIN_ERROR).send({ message: 'Были отправлены некорректные данные' });
      }
      return res.status(DEFAULT_ERROR).send({ message: 'Что-то пошло не так' });
    });
};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(VALIDATIN_ERROR).send({ message: 'Были отправлены некорректные данные' });
      }
      return res.status(DEFAULT_ERROR).send({ message: 'Что-то пошло не так' });
    });
};

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateProfile,
  updateAvatar,
};
