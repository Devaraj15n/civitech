const db = require('./models');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const routes = require('./routes');
const errorMiddleware = require('./middlewares/error.middleware');

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/api', routes);
app.use(errorMiddleware);


db.sequelize.authenticate()
    .then(() => console.log('DB Connected'))
    .catch(err => console.error(err));


module.exports = app;
