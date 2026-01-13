require('dotenv').config();
const app = require('./app');
const db = require('./models');

const PORT = process.env.PORT || 5000;

db.sequelize.authenticate()
  .then(() => {
    console.log('Database connected');

    return db.sequelize.sync({ alter: true }); // 👈 CREATE TABLES
  })
  .then(() => console.log('All tables synced'))
  .catch(err => console.error('DB error:', err));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
