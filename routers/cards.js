const routerCards = require('express').Router();
const { createCard, getCards, deleteCard } = require('../controllers/cards');

// Возвращаем все карточки
routerCards.get('/', getCards);

// Удаляем карточку по идентификатору
routerCards.delete('/:cardId', deleteCard);

// Создаём карточку
routerCards.post('/', createCard);

module.exports = routerCards;
