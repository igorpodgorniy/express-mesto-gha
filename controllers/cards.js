const Card = require('../models/card');
const {
  DEFAULT_ERROR,
  VALIDATIN_ERROR,
  NOT_FOUND_ERROR,
} = require('../constants/errors');

const createCard = (req, res) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(VALIDATIN_ERROR).send({ message: 'Были отправлены некорректные данные' });
      }
      return res.status(DEFAULT_ERROR).send({ message: 'Что-то пошло не так' });
    });
};

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(() => res.status(DEFAULT_ERROR).send({ message: 'Что-то пошло не так' }));
};

const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) {
        return res.status(NOT_FOUND_ERROR).send({ message: 'Карточки с указанным id не существует' });
      }
      return res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(VALIDATIN_ERROR).send({ message: 'Был указан некорректный id' });
      }
      return res.status(DEFAULT_ERROR).send({ message: 'Что-то пошло не так' });
    });
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => res.status(NOT_FOUND_ERROR).send({
      message: 'Карточки с указанным id не существует',
    }))
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(VALIDATIN_ERROR).send({ message: 'Был указан некорректный id' });
      }
      return res.status(DEFAULT_ERROR).send({ message: 'Что-то пошло не так' });
    });
};

const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        return res.status(NOT_FOUND_ERROR).send({ message: 'Карточки с указанным id не существует' });
      }
      return res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(VALIDATIN_ERROR).send({ message: 'Был указан некорректный id' });
      }
      return res.status(DEFAULT_ERROR).send({ message: 'Что-то пошло не так' });
    });
};

module.exports = {
  createCard,
  deleteCard,
  getCards,
  likeCard,
  dislikeCard,
};
