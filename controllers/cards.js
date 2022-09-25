const Card = require('../models/card');
const NotFoundError = require('../errors/not-found-error');
const ValidationError = require('../errors/validation-error');
const ForbiddenError = require('../errors/forbidden-error');

const createCard = (req, res, next) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new ValidationError('Были отправлены некорректные данные'));
      }
      return next(err);
    });
};

const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(next);
};

const deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .orFail(() => {
      throw new NotFoundError('Карточки с указанным id не существует');
    })
    .then((card) => {
      if (!card.owner.equals(req.user._id)) {
        return next(new ForbiddenError('Вы не можете удалить чужую карточку'));
      }
      return card.remove().then(() => res.send({
        message: 'Карточка удалена',
      }));
    })
    .catch(next);
};

const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      throw new NotFoundError('Карточки с указанным id не существует');
    })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new ValidationError('Был указан некорректный id'));
      }
      return next(err);
    });
};

const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      throw new NotFoundError('Карточки с указанным id не существует');
    })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new ValidationError('Был указан некорректный id'));
      }
      return next(err);
    });
};

module.exports = {
  createCard,
  deleteCard,
  getCards,
  likeCard,
  dislikeCard,
};
