const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const regExp = require('../constants/constants');
const auth = require('../middlewares/auth');
const routerUsers = require('./users');
const routerCards = require('./cards');
const NotFoundError = require('../errors/not-found-error');
const {
  login,
  createUser,
} = require('../controllers/users');

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);
router.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(regExp),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), createUser);

router.use('/users', auth, routerUsers);
router.use('/cards', auth, routerCards);

router.use(auth, (req, res, next) => {
  next(new NotFoundError('Такой страницы не существует'));
});

module.exports = router;
