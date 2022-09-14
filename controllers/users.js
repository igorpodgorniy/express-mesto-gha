const User = require('../models/user');

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send({ message: `Произошла ошибка ${err.name}` }));
};

const getUsers = (req, res) => {
  User.finde({})
    .then((users) => res.send({ data: users }))
    .catch((err) => res.status(500).send({ message: `Произошла ошибка ${err.name}` }));
};

const getUser = (req, res) => {
  User.findById(req.params.id)
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send({ message: `Произошла ошибка ${err.name}` }));
};

const updateProfile = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about })
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send({ message: `Произошла ошибка ${err.name}` }));
};

const updateAvatar = (req, res) => {
  const { link } = req.body;

  User.findByIdAndUpdate(req.user._id, { link })
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send({ message: `Произошла ошибка ${err.name}` }));
};

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateProfile,
  updateAvatar,
};
