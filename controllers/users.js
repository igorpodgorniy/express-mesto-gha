const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const {
  DEFAULT_ERROR,
  VALIDATIN_ERROR,
  NOT_FOUND_ERROR,
} = require('../constants/errors');

const createUser = (req, res) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
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
    .catch(() => res.status(DEFAULT_ERROR).send({ message: 'Что-то пошло не так' }));
};

const getUser = (req, res) => {
  User.findById(req.params.userId)
    .orFail(() => res.status(NOT_FOUND_ERROR).send({
      message: 'Пользователь с указанным id не существует',
    }))
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(VALIDATIN_ERROR).send({ message: 'Был указан некорректный id' });
      }
      return res.status(DEFAULT_ERROR).send({ message: 'Что-то пошло не так' });
    });
};

const getCurrentUser = (req, res) => {
  User.findById(req.user._id)
    .orFail(() => res.status(NOT_FOUND_ERROR).send({
      message: 'Пользователь с указанным id не существует',
    }))
    .then((user) => res.send({ data: user }))
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

const login = (req, res) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        'some-secret-key',
        { expiresIn: '7d' },
      );

      res.cookie('token', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
      });
    })
    .catch((err) => {
      res
        .status(401)
        .send({ message: err.message });
    });
};

module.exports = {
  createUser,
  getUsers,
  getUser,
  getCurrentUser,
  updateProfile,
  updateAvatar,
  login,
};
