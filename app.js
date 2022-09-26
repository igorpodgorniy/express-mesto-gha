const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const router = require('./routers');
const errorsProcessing = require('./middlewares/errors-processing');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(router);

app.use(errors());

app.use(errorsProcessing);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
