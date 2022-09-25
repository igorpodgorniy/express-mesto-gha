const jwt = require('jsonwebtoken');
const ValidationError = require('../errors/validation-error');

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new ValidationError('Необходима авторизация');
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, 'some-secret-key');
  } catch (err) {
    next(new ValidationError('Необходима авторизация'));
  }

  req.user = payload;

  next();
};

module.exports = auth;
