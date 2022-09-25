const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const routerUsers = require('./routers/users');
const routerCards = require('./routers/cards');
const { NOT_FOUND_ERROR, DEFAULT_ERROR } = require('./constants/errors');
const auth = require('./middlewares/auth');
const {
  login,
  createUser,
} = require('./controllers/users');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.post('/signin', login);
app.post('/signup', createUser);
app.use('/users', auth, routerUsers);
app.use('/cards', auth, routerCards);

app.use((req, res, next) => {
  res
    .status(NOT_FOUND_ERROR)
    .send({ message: 'Такой страницы не существует' });
  next();
});

app.use((err, req, res) => {
  const { statusCode = DEFAULT_ERROR, message } = err;

  res
    .status(statusCode)
    .send({
      message: statusCode === DEFAULT_ERROR
        ? 'На сервере произошла ошибка'
        : message,
    });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
