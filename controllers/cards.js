const Card = require('../models/card');

const createCard = (req, res) => {
  const { name, link } = req.body;
  const { _id } = req.user._id;

  Card.create({ name, link, _id })
    .then((card) => res.send({ data: card }))
    .catch((err) => res.status(500).send({ message: `Произошла ошибка ${err.name}` }));
};

const getCards = (req, res) => {
  Card.finde({})
    .then((cards) => res.send({ data: cards }))
    .catch((err) => res.status(500).send({ message: `Произошла ошибка ${err.name}` }));
};

const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.id)
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send({ message: `Произошла ошибка ${err.name}` }));
};

module.exports = {
  createCard,
  deleteCard,
  getCards,
};
