const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const routerUsers = require('./routers/users');
const routerCards = require('./routers/cards');
const { NOT_FOUND_ERROR } = require('./constants/errors');
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

app.use((req, res, next) => {
  req.user = {
    _id: '6320c49594140c93f94e5b2f',
  };

  next();
});

app.post('/signin', login);
app.post('/signup', createUser);
app.use('/users', routerUsers);
app.use('/cards', routerCards);

app.use((req, res, next) => {
  res.status(NOT_FOUND_ERROR).send({ message: 'Такой страницы не существует' });
  next();
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
