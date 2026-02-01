const db = require('./models');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require("path");


const routes = require('./routes');
const errorMiddleware = require('./middlewares/error.middleware');

const app = express();
app.use(
  "/api/uploads",
  express.static(path.join(__dirname, "uploads"))
);

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/api', routes);
app.use(errorMiddleware);
console.log("TETS");



db.sequelize.authenticate()
    .then(() => console.log('DB Connected'))
    .catch(err => console.error(err));


module.exports = app;
