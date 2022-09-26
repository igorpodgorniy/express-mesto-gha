const { DEFAULT_ERROR } = require('../constants/errors');

const errorsProcessing = ((err, req, res, next) => {
  const { statusCode = DEFAULT_ERROR, message } = err;

  res
    .status(statusCode)
    .send({
      message: statusCode === DEFAULT_ERROR
        ? 'На сервере произошла ошибка'
        : message,
    });

  next();
});

module.exports = errorsProcessing;
