const routerCards = require('express').Router();
const {
  createCard,
  getCards,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

// Возвращаем все карточки
routerCards.get('/', getCards);

// Удаляем карточку по идентификатору
routerCards.delete('/:cardId', deleteCard);

// Создаём карточку
routerCards.post('/', createCard);

// Ставим лайк карточке
routerCards.put('/:cardId/likes', likeCard);

// Удаляем лайк у карточки
routerCards.delete('/:cardId/likes', dislikeCard);

module.exports = routerCards;
