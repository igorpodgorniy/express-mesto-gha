const User = require('../models/user');

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Были отправлены некорректные данные' });
      }
      return res.status(500).send({ message: `Что-то пошло не так. Код ошибки: ${err.status}` });
    });
};

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => res.status(500).send({ message: `Что-то пошло не так. Код ошибки: ${err.status}` }));
};

const getUser = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: 'Пользователь с указанным id не существует' });
      }
      return res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'Был указан некорректный id' });
      }
      return res.status(500).send({ message: `Что-то пошло не так. Код ошибки: ${err.status}` });
    });
};

const updateProfile = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Были отправлены некорректные данные' });
      }
      return res.status(500).send({ message: `Что-то пошло не так. Код ошибки: ${err.status}` });
    });
};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true })
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send({ message: `Что-то пошло не так. Код ошибки: ${err.status}` }));
};

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateProfile,
  updateAvatar,
};
