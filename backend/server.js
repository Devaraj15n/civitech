require('dotenv').config();
const app = require('./app');
const { sequelize } = require('./models');

const PORT = process.env.PORT || 5000;

sequelize.authenticate()
  .then(() => console.log('Database connected'))
  .catch(err => console.error('DB error:', err));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
