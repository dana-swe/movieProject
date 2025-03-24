const app = require('./app');
const { sequelize } = require('./models');

const PORT = process.env.APP_PORT || 8000;

sequelize.sync() 
  .then(() => {
    console.log('Database synchronized');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Error synchronizing database:', err);
  });
